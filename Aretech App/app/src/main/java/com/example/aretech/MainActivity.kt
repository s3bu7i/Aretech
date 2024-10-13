package com.example.aretech

import android.content.Intent
import android.content.Intent.CATEGORY_DEFAULT
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.view.KeyEvent
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.content.ContextCompat
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import com.example.aretech.databinding.ActivityMainBinding
import com.example.aretech.global.SessionManager
import com.example.aretech.ui.custom_ui_componenets.interfaces.KeyEventListener
import com.example.aretech.util.gone
import com.example.aretech.util.visible
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject


@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    private  var binding: ActivityMainBinding? = null
    private lateinit var navController: NavController
    private var alertDialog: AlertDialog? = null
    @Inject
    lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding?.root)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.fragmentContainerView) as NavHostFragment
        navController = navHostFragment.navController

        binding?.bottomNavBar?.setItemSelected(R.id.nav_home, true)
        binding?.bottomNavBar?.setOnItemSelectedListener {
            when (it) {
                R.id.nav_home -> navController.navigate(R.id.homeFragment)
                R.id.nav_operation -> navController.navigate(R.id.operationFragment)
                R.id.nav_setting -> navController.navigate(R.id.settingsFragment)
            }
        }

        navController.addOnDestinationChangedListener { _, destination, _ ->
            when (destination.id) {
                R.id.homeFragment -> {
                    this.window.statusBarColor = ContextCompat.getColor(this, R.color.white)
                    binding?.bottomNavBar?.visible()
                    binding?.bottomNavBar?.setItemSelected(R.id.nav_home, true)
                }
                R.id.operationFragment -> {
                    this.window.statusBarColor = ContextCompat.getColor(this, R.color.primary)
                    binding?.bottomNavBar?.visible()
                    binding?.bottomNavBar?.setItemSelected(R.id.nav_operation, true)
                }
                R.id.settingsFragment -> {
                    this.window.statusBarColor = ContextCompat.getColor(this, R.color.primary)
                    binding?.bottomNavBar?.visible()
                    binding?.bottomNavBar?.setItemSelected(R.id.nav_setting, true)
                }
                else -> {
                    this.window.statusBarColor = ContextCompat.getColor(this, R.color.primary)
                    binding?.bottomNavBar?.gone()
                }

            }

        }
    }


    override fun onStop() {
        super.onStop()
        alertDialog?.cancel()
    }


    private fun getAppSettings() {
        try {
            val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
            intent.addCategory(CATEGORY_DEFAULT)
            val uri: Uri = Uri.fromParts("package", packageName, null)
            intent.data = uri
            startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }


    override fun dispatchKeyEvent(event: KeyEvent?): Boolean {
        val navHostFragment = supportFragmentManager.primaryNavigationFragment
        val currentFragment = navHostFragment?.childFragmentManager?.primaryNavigationFragment
        if (currentFragment is KeyEventListener) {
            if (currentFragment.onKeyEvent(event?.keyCode, event)) {
                return true
            }
        }
        return super.dispatchKeyEvent(event)
    }
    fun setBottomNavigationVisibility(visibility: Int) {
        binding?.bottomNavBar?.visibility = visibility
    }
    override fun onDestroy() {
        super.onDestroy()
        binding = null
    }
}