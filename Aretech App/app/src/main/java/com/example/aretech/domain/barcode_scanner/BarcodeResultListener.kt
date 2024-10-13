package com.example.aretech.domain.barcode_scanner

import com.example.aretech.util.Resources


interface BarcodeResultListener {
    fun onBarcodeResult(barcode: Resources<String>)
}
