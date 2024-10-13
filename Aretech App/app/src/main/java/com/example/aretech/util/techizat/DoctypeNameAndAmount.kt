package com.example.aretech.util.techizat

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
class DoctypeNameAndAmount(
    var doctype: String,
    var amount: Double
) : Parcelable