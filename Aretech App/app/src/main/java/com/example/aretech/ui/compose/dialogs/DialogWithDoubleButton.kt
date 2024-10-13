package com.example.aretech.ui.compose.dialogs

import androidx.annotation.StringRes
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.aretech.R

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DialogWithDoubleButton(
    title: String,
    body: String,
    onDismiss: () -> Unit,
    @StringRes textCancel: Int = R.string.btn_cancel,
    @StringRes textConfirm: Int = R.string.btn_confirm,
    isEnabled: Boolean = true,
    onCancel: () -> Unit,
    onConfirm: () -> Unit
) {
    AlertDialog(
        modifier = Modifier
            .background(color = colorResource(id = android.R.color.transparent))
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        onDismissRequest = onDismiss
    ) {
        MainDialogViewCloseButton(title = title, onDismiss = onDismiss, content =  {
            Column(modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 10.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(25.dp)) {
                Text(text = body)
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    DialogWhiteButton(modifier = Modifier
                        .padding(vertical = 5.dp)
                        .weight(1f), text = textCancel, isEnabled = isEnabled, onClick = onCancel)
                    DialogPrimaryButton(modifier = Modifier
                        .padding(vertical = 5.dp)
                        .weight(1f), text = textConfirm, isEnabled = isEnabled, onClick = onConfirm)
                }
            }
        })
    }
}

@Preview
@Composable
fun DialogWithDoubleButtonPreview() {
    DialogWithDoubleButton(title = "Title",
        body = "Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body",
        onDismiss = {}, onCancel = {}, onConfirm = {})
}