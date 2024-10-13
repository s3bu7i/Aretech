package com.example.aretech.ui.activities.menu.checks.load.views

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.checks.load.DriverLoadStatusState
import com.example.aretech.ui.activities.menu.checks.load.model.CheckItem
import com.example.aretech.ui.activities.menu.checks.load.model.CheckListHistory
import com.example.aretech.ui.activities.menu.checks.load.model.DriverLoadFragmentDialogType
import com.example.aretech.ui.activities.menu.checks.theme.TextBody2Bold_13sp_greyScale900
import com.example.aretech.ui.activities.menu.checks.theme.TextBody2Bold_13sp_primary500
import com.example.aretech.ui.activities.menu.checks.theme.TextBody2Regular_13sp_greyScale200
import com.example.aretech.ui.activities.menu.checks.theme.TextBody2Regular_13sp_greyScale900
import com.example.aretech.ui.activities.menu.task.views.common.ImageInRoundShapeCard


@Composable
fun DriverLoadItemView(modifier: Modifier = Modifier, enabled: Boolean, isAnyLoadStarted: Boolean, data: CheckItem, onClick: (String) -> Unit, onEvent: (CheckListHistory) -> Unit) {
    Card(
        modifier = modifier.padding(top = 10.dp, start = 15.dp, end = 15.dp),
        colors = CardDefaults.cardColors(containerColor = colorResource(id = R.color.white)),
        border = BorderStroke(width = 1.dp, color = colorResource(id = R.color.grey_scale_50))
    ) {
        Row(
            modifier = modifier.clickable(
            onClick = { if (enabled) onClick(data.price) },
            interactionSource = remember { MutableInteractionSource() },
            indication = rememberRipple(bounded = true),
        )) {
            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(10.dp)
            ) {
//                Image(
//                    modifier = Modifier.padding(horizontal = 5.dp),
//                    painter = painterResource(id = R.drawable.ic_no_photo),
//                    contentDescription = ""
//                )
                TextBody2Bold_13sp_primary500(text = data.date)

                TextBody2Bold_13sp_greyScale900(text = data.checkId, modifier = Modifier)

                Row(
                    horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 4.dp)
                ) {
                    Row(modifier = Modifier.weight(1f)) {
                        TextBody2Regular_13sp_greyScale200(text = "Seller: ")
                        TextBody2Regular_13sp_greyScale900(text = data.seller)
                    }
                    Row(modifier = Modifier.weight(1f)) {
                        TextBody2Regular_13sp_greyScale200(text = "Price: ")
                        TextBody2Regular_13sp_greyScale900(text = data.price)
                    }
                }
            }

            Column(modifier = Modifier.padding(top = 10.dp, end = 10.dp)) {
                when (data.status) {
                    DriverLoadStatusState.DRIVER_LOAD_STATUS_UNASSIGNED -> if (!isAnyLoadStarted) ImageInRoundShapeCard(image = R.drawable.ic_close_door_standart) {
                        if (enabled) {
                            onEvent(CheckListHistory.DisplayAlertDialog(DriverLoadFragmentDialogType.StartLoad))
                            onEvent(CheckListHistory.OnSetSelectedLoad(data))
                        }
                    }
                    DriverLoadStatusState.DRIVER_LOAD_STATUS_STARTED -> ImageInRoundShapeCard(image = R.drawable.ic_send) {
                        if (enabled) {
                            onEvent(CheckListHistory.DisplayAlertDialog(DriverLoadFragmentDialogType.FinishLoad))
                            onEvent(CheckListHistory.OnSetSelectedLoad(data))
                        }
                    }
                    DriverLoadStatusState.DRIVER_LOAD_STATUS_FINISHED -> Image(
                        modifier = Modifier.size(24.dp),
                        painter = painterResource(id = R.drawable.ic_doublecheck),
                        contentDescription = ""
                    )
                }
            }
        }
    }
}


@Preview(showBackground = true)
@Composable
private fun DriverLoadItemViewPreview() {
    DriverLoadItemView(
        enabled = true,
        isAnyLoadStarted = true,
        data = CheckItem(
            "Driver Name",
            date = "34-YG-UH",
            price = "2wdwd",
            status = DriverLoadStatusState.DRIVER_LOAD_STATUS_FINISHED,
            seller = "wdwda"
        ),
        modifier = Modifier,
        onClick = {},
        onEvent = {}
    )
}