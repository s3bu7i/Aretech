package com.example.aretech.ui.fragments.bottom.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.focusable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import androidx.navigation.fragment.findNavController
import com.example.aretech.R
import com.example.aretech.databinding.FragmentComposeViewBinding
import com.example.aretech.ui.activities.menu.checks.module.model.CheckModule
import com.example.aretech.ui.activities.menu.checks.module.viewModel.ChecksFragmentModuleViewModel
import com.example.aretech.ui.activities.menu.checks.theme.TextBody2Regular_16sp_greyScale900
import com.example.aretech.ui.base.BaseFragment
import com.example.aretech.util.showActivityCloseDialog
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class HomeFragment : BaseFragment<FragmentComposeViewBinding>() {
    private lateinit var navController: NavController
    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> FragmentComposeViewBinding
        get() = FragmentComposeViewBinding::inflate

    override val bindViews: FragmentComposeViewBinding.() -> Unit = {
        navController = findNavController()
        binding.composeView.apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                val viewModel: ChecksFragmentModuleViewModel = hiltViewModel()
                val state = viewModel.checksModuleState

                Column(
                    modifier = Modifier.fillMaxSize()
                ) {
                    Card(
                        shape = RoundedCornerShape(
                            topEnd = 0.dp,
                            topStart = 0.dp,
                            bottomStart = 25.dp,
                            bottomEnd = 25.dp
                        ),
                        colors = CardDefaults.cardColors(containerColor = colorResource(id = R.color.primary_50)),
                        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(120.dp)
                    ) {

                        Column(
                            modifier = Modifier.fillMaxSize(),
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Bottom
                        ) {
                            Text(
                                modifier = Modifier
                                    .padding(horizontal = 10.dp, vertical = 10.dp),
                                text = stringResource(id = R.string.check_result),
                                fontSize = 22.sp,
                                fontFamily = FontFamily(
                                    Font(
                                        R.font.sf_pro_medium,
                                        FontWeight.Medium
                                    )
                                ),
                                color = colorResource(id = R.color.grey_scale_900),
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis,
                                textAlign = TextAlign.Center
                            )
                        }
                    }
                    if(!state.isLoading){
                        LazyVerticalGrid(
                            columns = GridCells.Fixed(2), modifier = Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 15.dp, vertical = 10.dp),
                            horizontalArrangement = Arrangement.Center
                        ) {
                            items(state.list) {
                                CardModules(modifier = Modifier, it) {
                                    navController.navigate(it.action)
                                }
                            }
                        }
                    }
                }

            }
        }
    }


    @Composable
    private fun CardModules(
        modifier: Modifier,
        checkDocument: CheckModule,
        navigate: () -> Unit
    ) {
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Box{
                Card(
                    shape = CircleShape,
                    colors = CardDefaults.cardColors(containerColor = colorResource(id = R.color.primary_50)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
                    modifier = Modifier
                        .size(60.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .focusable(enabled = true)
                            .clickable(
                                interactionSource = remember { MutableInteractionSource() },
                                indication = rememberRipple(
                                    bounded = true,
                                    color = colorResource(id = R.color.dark_blue)
                                )
                            ) {
                                if (checkDocument.isPermitted){
                                    navigate()
                                }
                                else {
                                    showToast(getString(R.string.permission_denied))
                                }
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Image(
                            modifier = Modifier.size(24.dp),
                            painter = painterResource(id = checkDocument.icon),
                            contentDescription = "",
                            colorFilter = ColorFilter.tint(colorResource(id = R.color.primary_500))
                        )
                    }
                }
                if (!checkDocument.isPermitted){
                    Image(
                        modifier = Modifier.size(34.dp).padding(start = 12.dp, bottom = 10.dp).align(
                            Alignment.TopEnd),
                        painter = painterResource(id = R.drawable.ic_lock),
                        contentDescription = "",
                        colorFilter = ColorFilter.tint(colorResource(id = R.color.grey_scale_900))
                    )
                }

            }

            TextBody2Regular_16sp_greyScale900(
                modifier = Modifier.padding(vertical = 5.dp),
                text = stringResource(id = checkDocument.name),
                overflow = TextOverflow.Ellipsis,
                textAlign = TextAlign.Center
            )
        }
    }

    override fun onResume() {
        super.onResume()
        onBackPressed()
    }

    private fun onBackPressed() {
        requireActivity().onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    showActivityCloseDialog(requireContext()) {
                        findNavController().navigateUp()
                    }
                }
            })
    }
}