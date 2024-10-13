package com.example.aretech.util

import android.Manifest
import android.annotation.SuppressLint
import android.app.ActivityManager
import android.content.Context
import android.content.pm.PackageManager
import android.content.res.ColorStateList
import android.graphics.*
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.InsetDrawable
import android.os.Build
import android.text.Spannable
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.util.Base64
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.AppCompatTextView
import androidx.core.content.ContextCompat
import androidx.core.view.isGone
import androidx.core.view.isInvisible
import androidx.core.view.isVisible
import androidx.fragment.app.FragmentManager
import coil.load
import coil.transform.RoundedCornersTransformation
import com.example.aretech.R
import com.example.aretech.global.constants.Constants.Constants.DEFAULT_DURATION_DAY_COLOR
import com.example.aretech.ui.dialogs.PictureViewFragment
import com.example.aretech.util.enums.OnhandFilter
import com.google.android.material.card.MaterialCardView
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.io.IOException
import java.util.Locale
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec


fun View.gone() {
    isGone = true
}

fun View.visible() {
    isVisible = true
}

fun View.inVisible() {
    isInvisible = true
}


@SuppressLint("SetTextI18n")
fun showActivityCloseDialog(context: Context, listener: () -> Unit) {
    val dialogBuilder = AlertDialog.Builder(context).create()
    val inflater = LayoutInflater.from(context)
    val dialogView = inflater.inflate(R.layout.dialog_attention, null)
    dialogBuilder.setView(dialogView)
    val insetDrawable = InsetDrawable(ColorDrawable(Color.TRANSPARENT), 15, 0, 15, 0)
    dialogBuilder.window?.setBackgroundDrawable(insetDrawable)
    dialogBuilder.setCancelable(false)
    val exitButton = dialogView?.findViewById<MaterialCardView>(R.id.mtrl_close)
    val contunieButton = dialogView?.findViewById<AppCompatButton>(R.id.mtrl_confirm)
    val desc = dialogView?.findViewById<AppCompatTextView>(R.id.txt_descriptiosn)
    val title = dialogView?.findViewById<TextView>(R.id.dialog_title)
    desc?.text = "Pəncərə pağlanacaq əminsiniz?"
    contunieButton?.text = context.getString(R.string.btn_yes)
    exitButton?.setOnClickListener {
        dialogBuilder.dismiss()
    }
    contunieButton?.setOnClickListener {
        listener()
        dialogBuilder.dismiss()
    }
    title?.text = context.getString(R.string.information)
    dialogBuilder.show()
}


fun blurTextSeen(vararg textView: TextView) {
    textView.forEach {
        it.text = "###"
        it.paint.maskFilter = BlurMaskFilter(it.textSize / 3, BlurMaskFilter.Blur.NORMAL)
    }
}
fun stringParseColor(colorString:String?):Int{
    return try {
        if (!colorString.isNullOrBlank()) Color.parseColor(colorString)
        else Color.parseColor(DEFAULT_DURATION_DAY_COLOR)
    } catch (e: IllegalArgumentException) {
        Log.d("parseColor",e.message.toString())
        Color.parseColor(DEFAULT_DURATION_DAY_COLOR)
    }
}

fun spannableTextShow(context: Context, text: String, color: Int): SpannableString {
    val spannableNetTotal = SpannableString(text)
    spannableNetTotal.setSpan(
        ForegroundColorSpan(ContextCompat.getColor(context, R.color.black)),
        0,
        1,
        Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
    )
    spannableNetTotal.setSpan(
        ForegroundColorSpan(ContextCompat.getColor(context, color)),
        1,
        text.length,
        Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
    )
    return spannableNetTotal
}


fun isServiceRunning(context: Context, serviceClass: Class<*>): Boolean {
    val manager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager?
    for (service in manager!!.getRunningServices(Int.MAX_VALUE)) {
        if (serviceClass.name == service.service.className) {
            return true
        }
    }
    return false
}


fun addStrokeColors(isEmpty: Boolean, cardView: MaterialCardView, context: Context) {
    if (!isEmpty) {
        cardView.strokeWidth = 3
        cardView.strokeColor = context.getColor(R.color.grey_scale_100)
    } else {
        cardView.strokeWidth = 3
        cardView.strokeColor = context.getColor(R.color.redDark)
    }

}
fun loadImage(
    cvImgExtraGood: MaterialCardView,
    imgExtraGood: ImageView,
    image: String?,
    requireContext: Context
) {
    if (!image.isNullOrBlank()) {
        cvImgExtraGood.setCardBackgroundColor(ColorStateList.valueOf(requireContext.getColor(R.color.white)))
        cvImgExtraGood.strokeWidth = 0
        imgExtraGood.load(image) {
            crossfade(true)
            transformations(RoundedCornersTransformation())
        }
    }else {
        cvImgExtraGood.setCardBackgroundColor(ColorStateList.valueOf(requireContext.getColor(R.color.primary_50_50)))
        cvImgExtraGood.strokeWidth = 2
        imgExtraGood.load(R.drawable.ic_no_photo)
    }
}
fun clickForShowFullGoodImage(
    parentFragmentManager: FragmentManager,
    image: String?,
    cvImgExtraGood: MaterialCardView
) {
    cvImgExtraGood.setOnClickListener {
        if (!image.isNullOrBlank()){
            val previewImageFragment = PictureViewFragment.newInstance(arrayOf(image),0)
            previewImageFragment.show(parentFragmentManager,PictureViewFragment.TAG)
        }
    }
}
fun filterForItemsOnhand(onhand:Double,onhandFilter:OnhandFilter):Boolean {
    return if (!onhandFilter.onhandEqual && !onhandFilter.onhandHigher && !onhandFilter.onhandLess) {
        true
    } else {
        if (onhandFilter.onhandLess && !onhandFilter.onhandHigher && !onhandFilter.onhandEqual) onhand < 0
        else if (onhandFilter.onhandHigher && !onhandFilter.onhandLess && !onhandFilter.onhandEqual) onhand > 0.0
        else if (onhandFilter.onhandLess && !onhandFilter.onhandHigher) onhand <= 0
        else if (onhandFilter.onhandEqual && onhandFilter.onhandHigher && !onhandFilter.onhandLess) onhand >= 0
        else if (onhandFilter.onhandEqual && !onhandFilter.onhandHigher) onhand == 0.0
        else false
    }
}
fun changeBorderMaterial(context: Context,status: Boolean, card: MaterialCardView,list:List<TextView> = emptyList()) {
    if (status) {
        card.strokeWidth = 3
        card.strokeColor = context.getColor(R.color.primary_500)
        list.forEach {
            it.setTextColor(ColorStateList.valueOf(ContextCompat.getColor(context,R.color.primary_500)))
        }
    } else {
        card.strokeColor = context.getColor(R.color.grey_scale_50)
        card.strokeWidth = 3
        list.forEach {
            it.setTextColor(ColorStateList.valueOf(ContextCompat.getColor(context,R.color.grey_scale_900)))
        }
    }
}

fun checkPermissions(context: Context,permission: String): Boolean {
    return ContextCompat.checkSelfPermission(
            context,
            permission
        ) == PackageManager.PERMISSION_GRANTED
}

fun checkBluetoothPermissions(context: Context): Boolean {
    return if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
        ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.BLUETOOTH
        ) == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.BLUETOOTH_ADMIN
        ) == PackageManager.PERMISSION_GRANTED
    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.BLUETOOTH_CONNECT
        ) == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.BLUETOOTH_SCAN
        ) == PackageManager.PERMISSION_GRANTED
    } else true
}

fun timeTo24Format(inputTime: String?): String {
    return try {
        var output = inputTime?.substring(inputTime.indexOf(" ") + 1, inputTime.length) ?: ""
        if (output.length > 5) output = output.substring(0, 5)
        output
    } catch (e: Exception) {
        inputTime ?: ""
    }
}

fun String.wordsFirstLettersCapital(): String {
    return try {
        val strings = if (isBlank()) listOf() else split(" ")
        var name = ""
        strings.map { char ->
            char.replaceFirstChar { firstLetter -> firstLetter.uppercase() }
        }.forEach {
            name += "$it "
        }
        name
    } catch (e: Exception) {
        this
    }

}


fun textClear(vararg textView: TextView) {
    textView.forEach {
        it.text = ""
    }
}

fun filePathToBase64(filePath: String): String? {
    return try {
        val file = File(filePath)
        val fileInputStream = FileInputStream(file)
        val bytes = getBytes(fileInputStream)
        Base64.encodeToString(bytes, Base64.DEFAULT)
    } catch (e: IOException) {
        e.printStackTrace()
        null
    }
}

@Throws(IOException::class)
private fun getBytes(inputStream: FileInputStream): ByteArray {
    val byteBuffer = ByteArrayOutputStream()
    val bufferSize = 1024
    val buffer = ByteArray(bufferSize)

    var len: Int
    while (inputStream.read(buffer).also { len = it } != -1) {
        byteBuffer.write(buffer, 0, len)
    }
    return byteBuffer.toByteArray()
}
fun addSpaces(word: String, totalLength: Int): String {
    val wordLength = word.length
    val spacesToAdd = totalLength - wordLength
    if (totalLength == 0) return word
    if (spacesToAdd <= 0) {
        return "${word.substring(0, totalLength - 1)} "
    }
    val spaces = " ".repeat(spacesToAdd)
    return "$word$spaces"
}
fun String?.uppercaseAz(): String = this?.uppercase(Locale.forLanguageTag("az-Latn")) ?: ""

fun compressBitmap(originalBitmap: Bitmap, path: String) {
    val outputStream = FileOutputStream(path)
    originalBitmap.compress(Bitmap.CompressFormat.JPEG, 70, outputStream)
}

fun decryptAES(encryptedText: String): String {
    val key = "aAfFCcEeDd1234590786BbbAaCc12345"
    val iv = "FCcEeDd1290Cc135"
    val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
    val secretKeySpec = SecretKeySpec(key.toByteArray(), "AES")
    val ivParameterSpec = IvParameterSpec(iv.toByteArray())
    cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec)
    val encryptedBytes = Base64.decode(encryptedText, Base64.DEFAULT)
    val decryptedBytes = cipher.doFinal(encryptedBytes)
    return String(decryptedBytes)
}


