package com.example.aretech.ui.activities.menu.barcode_scanner

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AlertDialog
import androidx.camera.core.CameraSelector
import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.os.bundleOf
import androidx.fragment.app.Fragment
import androidx.fragment.app.setFragmentResult
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import com.example.aretech.R
import com.example.aretech.databinding.FragmentBarcodeScannerBinding
import com.example.aretech.domain.barcode_scanner.BarcodeAnalyzer
import com.example.aretech.domain.barcode_scanner.BarcodeResultListener
import com.example.aretech.global.constants.Constants.Constants.FRAGMENT_KEY_BARCODE
import com.example.aretech.global.constants.Constants.Constants.FRAGMENT_RESULT_BARCODE_CODE
import com.example.aretech.ui.fragments.bottom.report.error.checkErrorsScreen
import com.example.aretech.util.Alerts
import com.example.aretech.util.Resources
import com.example.aretech.util.checkPermissions
import java.util.concurrent.Executors

@ExperimentalGetImage
class FragmentBarcodeScanner: Fragment(),BarcodeResultListener {
    private lateinit var navController: NavController
    private var _binding: FragmentBarcodeScannerBinding? = null
    private val binding get() = _binding
    private val cameraExecutor = Executors.newSingleThreadExecutor()
    private val  REQUEST_CAMERA_PERMISSION = 200
    private var alertDialogPermission: AlertDialog? = null
    private var isBarcodeFinded = true

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentBarcodeScannerBinding.inflate(inflater, container, false)
        return binding?.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        requireActivity().window.statusBarColor = ContextCompat.getColor(requireContext(), R.color.black)
        navController = findNavController()


        onBackPressed()
    }



    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(requireContext())

        cameraProviderFuture.addListener({
            val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder().build().also {
                it.setSurfaceProvider(binding?.cameraPreview?.surfaceProvider)
            }

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            val imageAnalysis = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()

            imageAnalysis.setAnalyzer(cameraExecutor, BarcodeAnalyzer(this))

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this, cameraSelector, preview, imageAnalysis
                )
            } catch (exc: Exception) {
                Log.e("CameraFragment", "Use case binding failed", exc)
            }
        }, ContextCompat.getMainExecutor(requireContext()))
    }

    override fun onDestroyView() {
        super.onDestroyView()
        cameraExecutor.shutdown()
        _binding = null
    }
    private fun onBackPressed() {
        requireActivity().onBackPressedDispatcher.addCallback(
            viewLifecycleOwner,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    navController.popBackStack()
                }
            })
        binding?.btnclose?.setOnClickListener {
                navController.popBackStack()
        }
    }
    @Deprecated("Deprecated in Java")
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == REQUEST_CAMERA_PERMISSION){
            if (permissions.isNotEmpty()){
                if (checkPermissions(requireContext(),permissions[0])){
                    startCamera()
                }
                else if (!ActivityCompat.shouldShowRequestPermissionRationale(requireActivity(), permissions[0])) {
                    alertDialogPermission = Alerts.attentionDialog(
                        requireContext(), message = "Kamera icazəsini ayarlar bölməsindən etməlisiz", positivebuttonText = getString(R.string.settings)
                        , listenerForPositive =  {
                            getAppSettings()
                        }, isClosingAble = true, listenerForNegative = {
                            alertDialogPermission?.dismiss()
                        })
                }

                else if (!checkPermissions(requireContext(),permissions[0])){
                   requestCameraPermission()
                }
            }
        }

    }

    private fun requestCameraPermission() {
        requestPermissions(
            arrayOf(Manifest.permission.CAMERA),
            REQUEST_CAMERA_PERMISSION
        )
    }

    override fun onStart() {
        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.CAMERA)
            != PackageManager.PERMISSION_GRANTED
        ) requestCameraPermission()
         else  startCamera()
        super.onStart()

    }
    override fun onBarcodeResult(barcode: Resources<String>) {
        when(barcode){
            is Resources.Error -> {
               checkErrorsScreen(error = barcode.message ?: getString(R.string.error_text),requireContext()){
                   navController.popBackStack()
               }
            }
            is Resources.Loading ->{}
            is Resources.Success -> {
                if(isBarcodeFinded){
                    isBarcodeFinded = false
                    binding?.barcodeCode?.text = barcode.data?.ifBlank { "Scan edilir...." }
                    setFragmentResult(FRAGMENT_KEY_BARCODE, bundleOf(FRAGMENT_RESULT_BARCODE_CODE to barcode.data))
                    navController.popBackStack()
                }

            }
        }
    }
    private fun getAppSettings() {
        try {
            val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
            intent.addCategory(Intent.CATEGORY_DEFAULT)
            val uri: Uri = Uri.fromParts("package", requireContext().packageName, null)
            intent.data = uri
            startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}