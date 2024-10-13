package com.example.aretech.ui.activities.menu.camerax

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.drawable.BitmapDrawable
import android.os.Bundle
import android.util.Log
import android.view.OrientationEventListener
import android.view.ScaleGestureDetector
import android.view.Surface
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.Camera
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import coil.Coil
import coil.request.ImageRequest
import com.example.aretech.R
import com.example.aretech.databinding.FragmentCameraXBinding
import com.example.aretech.util.compressBitmap
import com.example.aretech.util.gone
import com.example.aretech.util.visible
import com.google.common.util.concurrent.ListenableFuture
import kotlinx.coroutines.launch
import java.io.File
import java.util.UUID
import kotlin.math.abs


class FragmentCameraX : AppCompatActivity() {
    private lateinit var cameraProviderFuture: ListenableFuture<ProcessCameraProvider>
    private var imageCapture: ImageCapture? = null
    private lateinit var cameraProvider: ProcessCameraProvider
    private lateinit var cameraSelector: CameraSelector
    private  var camera: Camera? =null
    private var flashStatus = false
    private var flipCameraStatus = false
    private var rotation = 0
    private var mRotation = 0
    private lateinit var orientationEventListener: OrientationEventListener
    private var listener = object : ScaleGestureDetector.SimpleOnScaleGestureListener(){
        override fun onScale(detector: ScaleGestureDetector): Boolean {
            val scale = camera?.cameraInfo?.zoomState?.value!!.zoomRatio * detector.scaleFactor
            camera?.cameraControl?.setZoomRatio(scale)
            return true
        }
    }
    private lateinit var binding: FragmentCameraXBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = FragmentCameraXBinding.inflate(layoutInflater)
        setContentView(binding.root)
        cameraProviderFuture = ProcessCameraProvider.getInstance(this)
        cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
        startCamera()
        binding.capture.setOnClickListener {
            takePhoto()
        }
        binding.toggleFlash.setOnClickListener {
            flashStateChange()
        }
        binding.flipCamera.setOnClickListener {
            flashStatus = false
            flashStateChange()
            flipCameraChange()
        }
        orientationEventListener = object : OrientationEventListener(this) {
            override fun onOrientationChanged(orientation: Int) {
                val newRotation = when {
                    (orientation in 0..45) || (orientation > 315) -> 0
                    orientation in 46..135  -> 90
                    orientation in 136 .. 225 -> 180
                    orientation in 226 ..315 -> 270
                    else -> 0
                }
                Log.d("mRotation",orientation.toString())

                if (mRotation != newRotation) {
                    val finalRotation: Int = if (newRotation > mRotation) {
                        if (mRotation == 0 && newRotation == 270) {
                            rotation + 90
                        } else {
                            rotation - abs(newRotation - mRotation)
                        }
                    } else {
                        if (mRotation == 270 && newRotation == 0) {
                            rotation - 90
                        }  else {
                            rotation + abs(newRotation - mRotation)
                        }
                    }
                    rotation = if (abs(finalRotation) == 360) {
                        0
                    } else {
                        finalRotation
                    }
                    mRotation = newRotation

                }

            }
        }

        if (orientationEventListener.canDetectOrientation())
            orientationEventListener.enable()

    }


    fun flipCameraChange(){
        if (flipCameraStatus) {
            cameraSelector = CameraSelector.Builder()
                .requireLensFacing(CameraSelector.LENS_FACING_BACK)
                .build()
            startCamera()
            flipCameraStatus = false
            binding.toggleFlash.visible()
            flashStatus = false
            binding.toggleFlash.setImageResource(R.drawable.ic_flash_off_24)
        } else {
            flipCameraStatus = true
            binding.toggleFlash.gone()
            cameraSelector = CameraSelector.Builder()
                .requireLensFacing(CameraSelector.LENS_FACING_FRONT)
                .build()
            startCamera()
        }
    }


    fun flashStateChange(){
        if (flashStatus) {
            flashStatus = false
            binding.toggleFlash.setImageResource(R.drawable.ic_flash_off_24)
            camera?.cameraInfo?.hasFlashUnit()
            camera?.cameraControl?.enableTorch(false)
        } else {
            flashStatus = true
            binding.toggleFlash.setImageResource(R.drawable.ic_flash_on_24)
            camera?.cameraInfo?.hasFlashUnit()
            camera?.cameraControl?.enableTorch(true)
        }
    }

    @SuppressLint("ClickableViewAccessibility")
    private fun startCamera() {
        val scaleGestureDetector = ScaleGestureDetector(this, listener)
        binding.cameraPreview.setOnTouchListener { _, event ->
            scaleGestureDetector.onTouchEvent(event)
            return@setOnTouchListener true
        }

        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)
        cameraProviderFuture.addListener(Runnable {
            cameraProvider = cameraProviderFuture.get()
            bindCameraUseCases()
        }, ContextCompat.getMainExecutor(this))
    }

    private fun bindCameraUseCases() {
        val preview = Preview.Builder()
            .build()
            .also {
                it.setSurfaceProvider(binding.cameraPreview.surfaceProvider)
            }

        imageCapture = ImageCapture.Builder()
            .build()
        try {
            cameraProvider.unbindAll()
            camera = cameraProvider.bindToLifecycle(
                this, cameraSelector, preview, imageCapture
            )
        } catch (exc: Exception) {
            // Hata durumları burada işlenir
        }
    }

    private fun takePhoto() {
        imageCapture?.targetRotation = when(mRotation){
            270 -> Surface.ROTATION_90
            90 -> Surface.ROTATION_270
            else -> 0
        }

        val imageCapture = imageCapture
        val directory = File(this.externalMediaDirs.firstOrNull().toString() + "/visit")
        if (directory.mkdirs()) {
            println("Directory created successfully")
        }
        val photoFile = File(
            directory,
            UUID.randomUUID().toString() + ".jpg"
        )

        val outputOptions = ImageCapture.OutputFileOptions.Builder(photoFile).build()
        imageCapture?.takePicture(
            outputOptions, ContextCompat.getMainExecutor(this),
            object : ImageCapture.OnImageSavedCallback {
                override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                    val intent = Intent()
                    val imageLoader = Coil.imageLoader(this@FragmentCameraX)
                    val request = ImageRequest.Builder(this@FragmentCameraX)
                        .data(outputFileResults.savedUri)
                        .target { drawable ->
                            val bitmap = (drawable as BitmapDrawable).bitmap
                            compressBitmap(bitmap,outputFileResults.savedUri?.path.toString())
                            intent.putExtra("imageUri",outputFileResults.savedUri?.path.toString())
                            setResult(RESULT_OK, intent)
                            finish()
                        }
                        .build()
                    lifecycleScope.launch {
                        imageLoader.execute(request)
                    }


                }
                override fun onError(exception: ImageCaptureException) {}
            }
        )
    }

    override fun onDetachedFromWindow() {
        orientationEventListener.disable()
        super.onDetachedFromWindow()
    }

}