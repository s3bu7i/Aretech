package com.example.aretech.ui.fragments.bottom.settings.adapters

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.example.aretech.ui.fragments.bottom.settings.tablayout.SettingsGeneralFragment
import com.example.aretech.ui.fragments.bottom.settings.tablayout.SettingsServiceFragment

private const val NUM_TABS = 2

class AdapterSettingsFragmentViewPager(
    fragmentManager: FragmentManager,
    lifecycle: Lifecycle
) :
    FragmentStateAdapter(fragmentManager, lifecycle) {

    override fun getItemCount(): Int {
        return NUM_TABS
    }

    override fun createFragment(position: Int): Fragment {
        when (position) {
            0 -> return SettingsGeneralFragment()
            1 -> return SettingsServiceFragment()
            else -> SettingsGeneralFragment()
        }
        return SettingsGeneralFragment()
    }
}