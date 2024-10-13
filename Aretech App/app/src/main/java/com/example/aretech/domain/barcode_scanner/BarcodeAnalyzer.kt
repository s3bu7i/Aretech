package com.example.aretech.domain.barcode_scanner

import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import com.example.aretech.util.Resources
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.common.InputImage

@ExperimentalGetImage
class BarcodeAnalyzer(private val barcodeResultListener: BarcodeResultListener) :
    ImageAnalysis.Analyzer {
    override fun analyze(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image
        if (mediaImage != null) {
            val image = InputImage.fromMediaImage(mediaImage,imageProxy.imageInfo.rotationDegrees)
            val scanner = BarcodeScanning.getClient()

            scanner.process(image)
                .addOnSuccessListener { barcodes ->
                    var rawValue = ""
                    for (barcode in barcodes) {
                        rawValue = barcode.rawValue ?: ""
                        barcodeResultListener.onBarcodeResult(Resources.Success(rawValue))
                    }
                    imageProxy.close()
                }
                .addOnFailureListener {
                    imageProxy.close()
                    barcodeResultListener.onBarcodeResult(
                        Resources.Error(
                            null,
                            "Barcode skanı uğursuz oldu"
                        )
                    )
                }
        }
    }
}
