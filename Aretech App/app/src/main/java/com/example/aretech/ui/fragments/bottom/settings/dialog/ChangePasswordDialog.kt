package com.example.aretech.ui.fragments.bottom.settings.dialog

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Toast
import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.TextSelectionColors
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ViewCompositionStrategy
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.ViewModelProvider
import com.example.aretech.R
import com.example.aretech.databinding.AlertPicturePreviewBinding
import com.example.aretech.ui.activities.menu.task.views.common.ImageInRoundShapeCard
import com.example.aretech.ui.fragments.bottom.settings.tablayout.SettingsGeneralFragment
import com.example.aretech.ui.fragments.bottom.settings.viewmodel.SettingsFragmentViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class ChangePasswordDialog : DialogFragment() {
    private lateinit var binding: AlertPicturePreviewBinding   // compose view
    private lateinit var parentFragment: SettingsGeneralFragment
    private lateinit var viewModel: SettingsFragmentViewModel


    companion object {
        const val TAG = "ChangePasswordDialog"
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
        viewModel = ViewModelProvider(parentFragment)[SettingsFragmentViewModel::class.java]
        binding.composeView.apply {
            setViewCompositionStrategy(ViewCompositionStrategy.DisposeOnViewTreeLifecycleDestroyed)
            setContent {
                ChangePasswordDialogView(R.string.change_password, dismiss = { dismiss() }, confirm = { oldPassword, newPassword ->
                    viewModel.requestChangePassword(oldPassword, newPassword)
                }, showToast = { Toast.makeText(requireContext(), getString(it), Toast.LENGTH_SHORT).show() })
            }
        }
    }

    override fun onAttach(context: Context) {
        super.onAttach(context)
        parentFragment = requireParentFragment() as SettingsGeneralFragment
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


@Composable
fun ChangePasswordDialogView(
    @StringRes title: Int,
    confirm: (String, String) -> Unit,
    dismiss: () -> Unit,
    showToast: (Int) -> Unit
) {

    var oldPassword by remember { mutableStateOf("") }
    var newPassword by remember { mutableStateOf("") }
    var newPasswordCopy by remember { mutableStateOf("") }

        Card(
            modifier = Modifier.padding(horizontal = 15.dp),
            colors = CardDefaults.cardColors(containerColor = colorResource(id = R.color.white)),
            shape = RoundedCornerShape(20.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = colorResource(id = R.color.primary_50),
                        contentColor = colorResource(
                            id = R.color.grey_scale_900
                        )
                    )
                ) {
                    Row(
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(
                                horizontal = 10.dp, vertical = 12.dp
                            )
                    ) {

                        Text(
                            fontSize = 18.sp,
                            text = stringResource(id = title),
                            fontFamily = FontFamily(
                                Font(R.font.sf_pro_medium, FontWeight.Medium)
                            ),
                            textAlign = TextAlign.Center,
                            modifier = Modifier
                                .padding(start = 20.dp)
                                .weight(1f),
                            color = colorResource(id = R.color.grey_scale_900)
                        )

                        ImageInRoundShapeCard(
                            image = R.drawable.ic_close,
                            description = "Close",
                        ) {
                            dismiss()
                        }
                    }
                }

                Column(
                    modifier = Modifier
                        .heightIn(max = 400.dp)
                        .padding(vertical = 20.dp, horizontal = 15.dp)
                        .fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    TextInputField(value = oldPassword, onValueChange = { oldPassword = it }, placeholderText = R.string.old_password, icon = R.drawable.ic_lock)

                    TextInputField(value = newPassword, onValueChange = { newPassword = it }, placeholderText = R.string.new_password, icon = R.drawable.ic_change_password)

                    TextInputField(value = newPasswordCopy, onValueChange = { newPasswordCopy = it }, placeholderText = R.string.new_password_again, icon = R.drawable.ic_change_password)
                }

                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 20.dp, start = 20.dp, end = 20.dp, top = 5.dp)
                        .height(50.dp)
                        .shadow(
                            clip = true,
                            elevation = 0.dp,
                            shape = RoundedCornerShape(70.dp)
                        ),
                    colors = CardDefaults.cardColors(
                        containerColor = colorResource(id = R.color.primary_500)
                    )
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .clickable {
                                if (oldPassword.isNotBlank() && newPassword.isNotBlank()) {
                                    if (newPassword != newPasswordCopy) showToast(R.string.passwords_not_match)
                                    else if (newPassword == oldPassword) showToast(R.string.passwords_same)
                                    else confirm(oldPassword, newPassword)
                                }
                                else showToast(R.string.needed_fields_empty_in_task)
                            },
                        contentAlignment = Alignment.Center
                    ) {
                       Text(
                            color = colorResource(id = R.color.white),
                            text = stringResource(id = title),
                            fontSize = 16.sp,
                            fontFamily = FontFamily(Font(R.font.sf_pro_display)),
                            textAlign = TextAlign.Center,
                        )
                    }
                }
            }
        }
    }

@Composable
fun TextInputField(
    value: String,
    @StringRes placeholderText: Int,
    onValueChange: (String) -> Unit,
    @DrawableRes icon: Int
) {

    Card(
        colors = CardDefaults.cardColors(
            containerColor = colorResource(id = R.color.white)
        ),
        modifier = Modifier
            .padding(10.dp)
            .wrapContentHeight(),
        shape = RoundedCornerShape(10.dp),
        border = BorderStroke(1.dp, color = colorResource(id = R.color.grey_scale_50)),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 10.dp, end = 10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                painter = painterResource(id = icon),
                contentDescription = "Search",
                tint = colorResource(id = R.color.grey_scale_100)
            )
            TextField(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                value = value,
                singleLine = true,
                colors = TextFieldDefaults.colors(
                    focusedContainerColor = Color.White,
                    unfocusedContainerColor = Color.White,
                    disabledContainerColor = Color.White,
                    cursorColor = colorResource(id = R.color.primary_500),
                    selectionColors = TextSelectionColors(
                        handleColor = colorResource(id = R.color.primary_500),
                        backgroundColor = colorResource(id = R.color.primary_50)
                    ),
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent,
                    disabledIndicatorColor = Color.Transparent,
                ),
                onValueChange = { onValueChange(it) },
                placeholder = {
                    Text(
                        text = stringResource(id = placeholderText),
                        color = colorResource(id = R.color.grey_scale_100),
                        fontFamily = FontFamily(
                            Font(
                                R.font.sf_pro_medium, FontWeight.Medium
                            )
                        ),
                        fontSize = 13.sp,
                        maxLines = 2,
                        overflow = TextOverflow.Clip
                    )
                },
                textStyle = TextStyle(
                    color = colorResource(id = R.color.text_color_header),
                    fontFamily = FontFamily(
                        Font(
                            R.font.sf_pro_medium, FontWeight.Medium
                        )
                    ),
                    fontSize = 13.sp,
                )
            )
            if (value.isNotBlank()) {
                Icon(
                    modifier = Modifier
                        .clip(RoundedCornerShape(7.dp))
                        .clickable { onValueChange("") },
                    painter = painterResource(id = R.drawable.ic_close_circle),
                    contentDescription = "",
                )
            }
        }
    }
}

@Preview
@Composable
fun TextInputFieldPreview() {
    TextInputField(
        value = "String value",
        placeholderText = R.string.search,
        onValueChange = {},
        icon = R.drawable.ic_change_password
    )
}