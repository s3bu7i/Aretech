package com.example.aretech.util

import android.content.Context
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.InsetDrawable
import android.view.LayoutInflater
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.AppCompatTextView
import androidx.core.view.isVisible
import androidx.navigation.NavController
import com.example.aretech.R
import com.example.aretech.databinding.AlertSendDocumentLoadingBinding
import com.google.android.material.card.MaterialCardView
import ir.androidexception.andexalertdialog.AndExAlertDialog


object Alerts {

    fun errorIosAlert(context: Context,errorIcon : Int,message: String, listener: () -> Unit) {
        val dialogBuilder = AlertDialog.Builder(context).create()
        val inflater = LayoutInflater.from(context)
        val insetDrawable = InsetDrawable(ColorDrawable(Color.TRANSPARENT),15,0,15,0)
        dialogBuilder.window?.setBackgroundDrawable(insetDrawable)
        dialogBuilder.show()
    }

    fun errorIosAlertOnlyPositiveButton(context: Context, positiveButtonText : String, message: String, listener: () -> Unit) {
        AndExAlertDialog.Builder(context)
            .setTitle(context.getString(R.string.error))
            .setMessage(message)
            .setPositiveBtnText(positiveButtonText)
            .setCancelableOnTouchOutside(true)
            .setImage(R.drawable.ic_error_vector, 25)
            .OnPositiveClicked {
                listener()
            }
            .setMessageTextColor(R.color.colorTextPrimary)
            .setButtonTextColor(R.color.colorAccent)
            .build()
    }

    fun errorIosAlertOnlyNegativeButton(context: Context,negativeButtonText : String,message: String) {
        AndExAlertDialog.Builder(context)
            .setTitle(context.getString(R.string.error))
            .setMessage(message)
            .setPositiveBtnText(negativeButtonText)
            .OnPositiveClicked{}
            .setCancelableOnTouchOutside(false)
            .setImage(R.drawable.ic_error_vector, 25)
            .setMessageTextColor(R.color.colorTextPrimary)
            .setButtonTextColor(R.color.colorAccent)
            .build()
    }

    fun errorIosAlertOnlyNegativeButtonWithBack(context: Context,navController: NavController,negativeButtonText : String,message: String) {
        AndExAlertDialog.Builder(context)
            .setTitle(context.getString(R.string.error))
            .setMessage(message)
            .setPositiveBtnText(negativeButtonText)
            .OnPositiveClicked{
                navController.popBackStack()
            }
            .setCancelableOnTouchOutside(false)
            .setImage(R.drawable.ic_error_vector, 25)
            .setMessageTextColor(R.color.colorTextPrimary)
            .setButtonTextColor(R.color.colorAccent)
            .build()
    }



    fun attentionDialog(context: Context, message: String,positivebuttonText:String,negativebuttonText:String = "", listenerForPositive: () -> Unit,listenerForNegative: () -> Unit,isClosingAble:Boolean = true,title:String = ""):AlertDialog {
        val dialogBuilder = AlertDialog.Builder(context).create()
        val inflater = LayoutInflater.from(context)
        val dialogView = inflater.inflate(R.layout.dialog_attention, null)
        dialogBuilder.setView(dialogView)
        val insetDrawable = InsetDrawable(ColorDrawable(Color.TRANSPARENT),15,0,15,0)
        dialogBuilder.window?.setBackgroundDrawable(insetDrawable)
        dialogBuilder.setCancelable(false)
        val exitButton = dialogView?.findViewById<MaterialCardView>(R.id.mtrl_close)
        val contunieButton = dialogView?.findViewById<AppCompatButton>(R.id.mtrl_confirm)
        val desc = dialogView?.findViewById<AppCompatTextView>(R.id.txt_descriptiosn)
        val txtTitle = dialogView?.findViewById<TextView>(R.id.dialog_title)
        exitButton?.isVisible = isClosingAble
        desc?.text = message
        contunieButton?.isVisible = positivebuttonText.isNotBlank()
        contunieButton?.text = positivebuttonText
        exitButton?.setOnClickListener {
            listenerForNegative()
        }
        contunieButton?.setOnClickListener {
            listenerForPositive()
            dialogBuilder.dismiss()
        }
        txtTitle?.text = title.ifEmpty { context.getString(R.string.information) }
        dialogBuilder.show()

        return dialogBuilder
    }

    fun showSendLoadingAlert(context: Context,message: String):AlertDialog{
        val bindingAlertSaveLoading =
            AlertSendDocumentLoadingBinding.inflate(
                LayoutInflater.from(
                    context
                )
            )
        val alertDialogBuilder = AlertDialog.Builder(context)
        alertDialogBuilder.setView(bindingAlertSaveLoading.root)
        alertDialogBuilder.setCancelable(false)
        bindingAlertSaveLoading.txtMessage.text = message
        val alertDialog = alertDialogBuilder.create()
        alertDialog.window?.setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
        return alertDialog
    }

}