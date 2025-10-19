package com.muayversern

import android.content.Context
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import android.graphics.ImageFormat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.mediapipe.tasks.core.BaseOptions
import com.google.mediapipe.tasks.vision.core.RunningMode
import com.google.mediapipe.tasks.vision.poselandmarker.PoseLandmarker
import com.google.mediapipe.tasks.components.containers.NormalizedLandmark
import com.google.mediapipe.framework.image.BitmapImageBuilder
import com.google.mediapipe.framework.image.MPImage
import android.graphics.BitmapFactory
import android.graphics.Rect
import android.graphics.YuvImage
import java.io.ByteArrayOutputStream

class PoseAnalyzer(val context: Context) : ImageAnalysis.Analyzer {

    private val poseLandmarker: PoseLandmarker

    init {
        val options = PoseLandmarker.PoseLandmarkerOptions.builder()
            .setBaseOptions(
                BaseOptions.builder()
                    .setModelAssetPath("pose_landmarker_lite.task")
                    .build()
            )
            .setRunningMode(RunningMode.LIVE_STREAM)
            .setResultListener { result, _ ->
                val landmarks = result.landmarks().firstOrNull()
                if (landmarks != null && landmarks.isNotEmpty()) {
                    sendKeypointsToJS(landmarks)
                }
            }
            .build()

        poseLandmarker = PoseLandmarker.createFromOptions(context, options)
    }

    override fun analyze(imageProxy: ImageProxy) {
        val mpImage = imageProxyToMPImage(imageProxy)
        poseLandmarker.detectAsync(mpImage, System.currentTimeMillis())
        imageProxy.close()
    }

    private fun sendKeypointsToJS(landmarks: List<NormalizedLandmark>) {
        val keypoints = Arguments.createArray()
        for (lm in landmarks) {
            val point = Arguments.createMap()
            point.putDouble("x", lm.x().toDouble())
            point.putDouble("y", lm.y().toDouble())
            point.putDouble("z", lm.z().toDouble())
            keypoints.pushMap(point)
        }

        val event = Arguments.createMap()
        event.putArray("keypoints", keypoints)

        (context as? ReactContext)?.let { reactContext ->
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onPoseKeypoints", event)
        }
    }

    private fun imageProxyToMPImage(imageProxy: ImageProxy): MPImage {
        val image = imageProxy.image ?: throw IllegalArgumentException("No image")
        val yBuffer = image.planes[0].buffer
        val vuBuffer = image.planes[2].buffer

        val ySize = yBuffer.remaining()
        val vuSize = vuBuffer.remaining()
        val nv21 = ByteArray(ySize + vuSize)

        yBuffer.get(nv21, 0, ySize)
        vuBuffer.get(nv21, ySize, vuSize)

        val yuvImage = YuvImage(nv21, ImageFormat.NV21, image.width, image.height, null)
        val out = ByteArrayOutputStream()
        yuvImage.compressToJpeg(Rect(0, 0, image.width, image.height), 100, out)
        val jpegBytes = out.toByteArray()

        val bitmap = BitmapFactory.decodeByteArray(jpegBytes, 0, jpegBytes.size)
        return BitmapImageBuilder(bitmap).build()
    }
}
