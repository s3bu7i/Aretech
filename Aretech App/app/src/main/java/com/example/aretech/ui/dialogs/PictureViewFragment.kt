package com.example.aretech.ui.dialogs


import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.fragment.app.DialogFragment
import com.example.aretech.R
import com.example.aretech.databinding.AlertPicturePreviewBinding
import com.example.aretech.ui.custom_ui_componenets.pictureView.PictureViewFragmentView
import com.example.aretech.ui.custom_ui_componenets.pictureView.PictureViewWithTextFragmentView

class PictureViewFragment : DialogFragment() {
    private lateinit var binding: AlertPicturePreviewBinding

    companion object {
        const val TAG = "PicturePreviewDialog"
        private const val ARG_KEY_IMAGE_URL = "IMAGE_URL_LIST"
        private const val CURRENT_INDEX = "CURRENT_INDEX"
        private const val TEXT_DESC = "TEXT_DESC"

        fun newInstance(data: Array<String>, currentImageIndex: Int, text: String? = null): PictureViewFragment {
            val fragment = PictureViewFragment()
            val args = Bundle()
            args.putStringArray(ARG_KEY_IMAGE_URL, data)
            args.putInt(CURRENT_INDEX, currentImageIndex)
            args.putString(TEXT_DESC, text ?: "")
            fragment.arguments = args
            return fragment
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = AlertPicturePreviewBinding.inflate(inflater)
        activity?.window?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val imageUrlList = arguments?.getStringArray(ARG_KEY_IMAGE_URL)
        val currentIndex = arguments?.getInt(CURRENT_INDEX)
        val text = arguments?.getString(TEXT_DESC)

        binding.composeView.apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)

            if (text.isNullOrBlank()) setContent {
                PictureViewFragmentView(modifier = Modifier.fillMaxSize(), imageUrlList = imageUrlList, currentIndex =  currentIndex) { dismiss() }
            }
            else setContent {
                PictureViewWithTextFragmentView(modifier = Modifier.fillMaxSize(), imageUrlList = imageUrlList, currentIndex =  currentIndex, text = text) { dismiss() }
            }
        }
    }


    override fun getTheme(): Int {
        return R.style.ThemeOverlay_App_BottomSheetDialog
    }

    override fun onStart() {
        super.onStart()
        dialog!!.window?.setLayout(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT
        )
    }
}

