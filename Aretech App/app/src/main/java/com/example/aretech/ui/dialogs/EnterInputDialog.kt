package com.example.aretech.ui.dialogs

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.InsetDrawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.example.aretech.databinding.EnterInputDialogBinding

class EnterInputDialog:DialogFragment() {
    private lateinit var binding: EnterInputDialogBinding
    var click: ((String) -> Unit)? = null
    private var amount:String = ""
    companion object {
        const val TAG = "EnterInputDialog"
    }

    fun setAmount(amount:String){
        this.amount = amount
    }
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = EnterInputDialogBinding.inflate(inflater)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.mtrlClose.setOnClickListener {
            dismiss()
        }
        if (amount != "0") binding.inputText.setText(amount)
        binding.cvConfirm.setOnClickListener {
            click?.invoke(binding.inputText.text.toString())
            dismiss()
        }
    }
    override fun onStart() {
        super.onStart()
        dialog?.window?.setLayout(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
        )
        val insetDrawable = InsetDrawable(ColorDrawable(Color.TRANSPARENT),60,0,60,0)
        dialog?.window?.setBackgroundDrawable(insetDrawable)
    }
}