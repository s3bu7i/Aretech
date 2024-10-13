package com.example.aretech.ui.activities.menu.print.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class PrintGoods(
    val itemCode : String,
    val itemName : String,
    val amount : String,
    val unit : String,
    val price : String,
    val total : String,
    val discountPer : String,
    val discount:String
):Parcelable