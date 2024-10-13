package com.example.aretech.util.permissions

import android.Manifest.permission.CAMERA
import android.Manifest.permission.READ_EXTERNAL_STORAGE

sealed class Permission(vararg val permissions: String) {
    // Individual permissions
    object Camera : Permission(CAMERA)
    object ReadExternalStorage : Permission(READ_EXTERNAL_STORAGE)

//     Grouped permissions
   object CameraCheck : Permission(CAMERA, READ_EXTERNAL_STORAGE)


    companion object {
        fun from(permission: String) = when (permission) {
            CAMERA -> Camera
            READ_EXTERNAL_STORAGE -> ReadExternalStorage
            else -> throw IllegalArgumentException("Unknown permission: $permission")
        }
    }
}