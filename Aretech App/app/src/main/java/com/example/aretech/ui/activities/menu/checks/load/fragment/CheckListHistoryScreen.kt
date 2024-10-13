package com.example.aretech.ui.activities.menu.checks.load.fragment

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Scaffold
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.aretech.R
import com.example.aretech.ui.activities.menu.checks.load.model.CheckItem
import com.example.aretech.ui.activities.menu.checks.load.model.CheckListHistory
import com.example.aretech.ui.activities.menu.checks.load.model.CheckLoadFragmentState
import com.example.aretech.ui.activities.menu.checks.load.views.DriverLoadItemView
import com.example.aretech.ui.activities.menu.checks.main.views.TopSearchView
import com.example.aretech.ui.activities.menu.task.views.common.ImageInRoundShapeCard
import com.example.aretech.ui.compose.dialogs.CircularProgressBar
import com.example.aretech.ui.compose.dialogs.ToolbarAretech


@Composable
fun CheckListHistoryScreen(
    modifier: Modifier = Modifier,
    state: CheckLoadFragmentState,
    onEvent: (CheckListHistory) -> Unit,
    onBackPress: () -> Unit,
    launchBarCodeDialog: () -> Unit
) {

    val context = LocalContext.current

    Scaffold(
        scaffoldState = rememberScaffoldState(),
        modifier = modifier,
        topBar = {
            ToolbarAretech(
                title = stringResource(id = R.string.loads),
                isRightButtonHas = emptyList(),
                backPress = onBackPress,
                rightButtonClick = {}
            )
        }
    ) { pd ->

        Column(Modifier.padding(pd).fillMaxSize()) {
            Row(Modifier.fillMaxWidth().padding(10.dp), verticalAlignment = Alignment.CenterVertically) {
                TopSearchView(searchText = state.searchQuery, modifier = Modifier.weight(1f)) { onEvent(CheckListHistory.OnSearch(it)) }
                ImageInRoundShapeCard(
                    size = 55,
                    image = R.drawable.ic_barcode_scan, description = "",
                    tint = R.color.grey_scale_900, onClick = launchBarCodeDialog
                )
            }
            LazyColumn {
                items(state.loadList, key = { l -> l.price }) { load ->
                    DriverLoadItemView(data = load, isAnyLoadStarted = state.isAnyLoadStarted, onEvent = onEvent, enabled = !state.isLoading, onClick = {
                    })
                }
            }
        }
        if (state.isLoading) Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressBar() }
    }
}


@Preview
@Composable
private fun CheckListHistoryScreenPreview() {
    CheckListHistoryScreen(state = CheckLoadFragmentState(loadList = listOf(
        CheckItem("efIuFfk039k", "Seller A", "2024-09-02 18:05", "20.50 AZN", 0)
    )), onEvent = {}, onBackPress = {}, launchBarCodeDialog = {})
}