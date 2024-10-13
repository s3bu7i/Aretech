package com.example.aretech.ui.compose.dialogs

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.DialogProperties
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.checks.theme.TextTitleMedium_22sp_greyScale900
import com.example.aretech.ui.compose.buttons.CloseButton


@Composable
internal fun MainDialogViewCloseButton(title: String, onDismiss: () -> Unit, content: @Composable () -> Unit) {
    MainDialogView(title = title, onDismiss = onDismiss, content = content, header = { MainDialogHeaderView(title = title, trailingButton = { CloseButton(onClick = onDismiss)}) })
}

@Composable
internal fun MainDialogViewNoCloseButton(title: String, onDismiss: () -> Unit, content: @Composable () -> Unit) {
    MainDialogView(title = title, onDismiss = onDismiss, content = content, header = { MainDialogHeaderView(title = title) })
}



@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun MainDialogView(title: String, onDismiss: () -> Unit, content: @Composable () -> Unit, header: @Composable () -> Unit) {
    AlertDialog(
        onDismissRequest = { onDismiss() },
        modifier = Modifier, properties = DialogProperties(
            dismissOnClickOutside = false,
            dismissOnBackPress = false,
            usePlatformDefaultWidth = false)) {
        Card(
            modifier = Modifier.padding(horizontal = 15.dp),
            colors = CardDefaults.cardColors(containerColor = colorResource(id = R.color.white)),
            shape = RoundedCornerShape(20.dp)) {
            Column(modifier = Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
                header()
                Box(modifier = Modifier.heightIn(max = 400.dp).padding(top = 10.dp, bottom = 20.dp).fillMaxWidth(), contentAlignment = Alignment.Center){ Column { content() } }
            }
        }
    }
}


@Composable
private fun MainDialogHeaderView(title: String, trailingButton: @Composable() (() -> Unit) = {}) {

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(
            containerColor = colorResource(id = R.color.primary_50),
            contentColor = colorResource(id = R.color.grey_scale_900))
    ) {
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 10.dp, vertical = 12.dp)) {
            TextTitleMedium_22sp_greyScale900(
                text = title,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(start = 20.dp).weight(1f)
            )
            trailingButton()
        }
    }
}





@Preview
@Composable
private fun MainDialogViewPreview() {
    MainDialogView(title = stringResource(id = R.string.dialog_permission_title), onDismiss = {}, content = {}, header = { MainDialogHeaderView(title = stringResource(id = R.string.dialog_permission_title)) })
}