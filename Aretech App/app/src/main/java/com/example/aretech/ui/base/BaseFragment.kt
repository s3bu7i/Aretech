package com.example.aretech.ui.base

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.DialogFragment
import androidx.fragment.app.Fragment
import androidx.viewbinding.ViewBinding
import com.example.aretech.global.SessionManager
import com.google.android.material.snackbar.Snackbar


abstract class BaseFragment<Binding : ViewBinding> : Fragment() {
    protected abstract val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> Binding?

    private var _binding : Binding? = null
    val binding : Binding get() = _binding!!
    private lateinit var sessionManager: SessionManager

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = bindingCallBack.invoke(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        sessionManager = SessionManager(requireContext())
        bindViews.invoke(binding)
    }

    protected open val bindViews: Binding.() -> Unit = {}

    fun <T : DialogFragment> T.show(tag: String? = null): T {
        this.show(this@BaseFragment.parentFragmentManager, tag)
        return this
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
    fun showToast(message: String) {
        Toast.makeText(requireContext(), message, Toast.LENGTH_LONG).show()
    }

    fun showSnackBar(view : View,message : String){
        Snackbar.make(view,message,Snackbar.LENGTH_SHORT).show()
    }
}