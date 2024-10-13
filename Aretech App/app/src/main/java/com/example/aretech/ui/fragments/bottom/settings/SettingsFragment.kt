package com.example.aretech.ui.fragments.bottom.settings

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.fragment.app.viewModels
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import com.example.aretech.R
import com.example.aretech.databinding.FragmentSettingsBinding
import com.example.aretech.ui.base.BaseFragment
import com.example.aretech.ui.fragments.bottom.settings.adapters.AdapterSettingsFragmentViewPager
import com.example.aretech.ui.fragments.bottom.settings.viewmodel.SettingsFragmentViewModel
import com.google.android.material.tabs.TabLayoutMediator
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class SettingsFragment : BaseFragment<FragmentSettingsBinding>() {
    private lateinit var navController: NavController
    val viewModel:SettingsFragmentViewModel by viewModels()
    private val settingTabName = arrayOf("Ümumi", "Xidmət")

    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSettingsBinding
        get() = FragmentSettingsBinding::inflate

    override val bindViews: FragmentSettingsBinding.() -> Unit = {
        navController = findNavController()

        val adapter = AdapterSettingsFragmentViewPager(
            childFragmentManager,
            lifecycle,
        )
        viewPager.adapter = adapter

        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
            tab.text = settingTabName[position]
        }.attach()



        onBackPressed()
    }

    private fun onBackPressed() {
        requireActivity().onBackPressedDispatcher.addCallback(
            requireActivity(),
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    navController.navigate(R.id.homeFragment)
                }
            })
    }

    override fun onDestroyView() {
        binding.viewPager.adapter = null
        super.onDestroyView()
    }
}