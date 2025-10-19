package com.muayversern

import android.view.LayoutInflater
import androidx.camera.view.PreviewView
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import android.view.ViewGroup

@ReactModule(name = MuayPoseViewManager.REACT_CLASS)
class MuayPoseViewManager : SimpleViewManager<PreviewView>() {

    companion object {
        const val REACT_CLASS = "MuayPoseView"
    }

    override fun getName() = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): PreviewView {
        // ✅ Inflate จาก XML เพื่อให้แน่ใจว่า layout เต็มหน้าจอ
        val inflater = LayoutInflater.from(reactContext)
        val previewView = inflater.inflate(R.layout.muay_pose_view, null) as PreviewView
        CameraXController.startCamera(reactContext, previewView)

        return previewView
    }
}