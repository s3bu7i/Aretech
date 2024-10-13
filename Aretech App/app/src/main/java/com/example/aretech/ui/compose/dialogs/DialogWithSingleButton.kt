package com.example.aretech.ui.compose.dialogs

import androidx.annotation.StringRes
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.checks.theme.TextBody2Regular_16sp_greyScale900

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DialogWithSingleButton(
    title: String = stringResource(id = R.string.information),
    body: String,
    onDismiss: () -> Unit,
    @StringRes confirmText: Int = R.string.btn_confirm,
    isEnabled: Boolean = true,
    onConfirm: () -> Unit = onDismiss
) {
    AlertDialog(
        modifier = Modifier
            .background(color = colorResource(id = android.R.color.transparent))
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        onDismissRequest = onDismiss
    ) {
        MainDialogViewCloseButton(title = title, onDismiss = onDismiss) {
            Column(modifier = Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(25.dp)) {
                TextBody2Regular_16sp_greyScale900(modifier = Modifier.padding(horizontal = 10.dp), text = body)
                DialogPrimaryButton(modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 10.dp, vertical = 5.dp), text = confirmText, isEnabled = isEnabled, onClick = onConfirm)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DialogWithSingleButtonNoClose(
    title: String = stringResource(id = R.string.information),
    body: String,
    onDismiss: () -> Unit,
    @StringRes confirmText: Int = R.string.btn_confirm,
    isEnabled: Boolean = true,
    onConfirm: () -> Unit = onDismiss
) {
    AlertDialog(
        modifier = Modifier
            .background(color = colorResource(id = android.R.color.transparent))
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
        onDismissRequest = onDismiss
    ) {
        MainDialogViewNoCloseButton(title = title, onDismiss = onDismiss) {
            Column(modifier = Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(25.dp)) {
                TextBody2Regular_16sp_greyScale900(text = body, modifier = Modifier.padding(horizontal = 20.dp))
                DialogPrimaryButton(modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 10.dp, vertical = 5.dp), text = confirmText, isEnabled = isEnabled, onClick = onConfirm)
            }
        }
    }
}

@Preview
@Composable
fun DialogWithSingleButtonPreview() {
    DialogWithSingleButton(body = "Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body Body", onDismiss = {})
}