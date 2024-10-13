package com.example.aretech.ui.fragments.bottom.operation.chart

import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.aretech.databinding.FragmentChartBinding
import com.example.aretech.ui.base.BaseFragment
import com.github.mikephil.charting.charts.LineChart
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet

class ChartFragment : BaseFragment<FragmentChartBinding>() {

    override val bindingCallBack: (LayoutInflater, ViewGroup?, Boolean) -> FragmentChartBinding
        get() = FragmentChartBinding::inflate

    override val bindViews: FragmentChartBinding.() -> Unit
        get() = {
            val charts = arrayOfNulls<LineChart>(1)
            charts[0] = binding.chart1

//            val mTf = Typeface.createFromAsset(, "OpenSans-Bold.ttf");

            for(i in charts.indices){

            val data = getData(36, 100F)
//            data.setValueTypeface(mTf);

            // add some transparency to the color with "& 0x90FFFFFF"
            setupChart(charts[i]!!, data, colors[i % colors.size]);
        }

        }

    private val colors = intArrayOf(
        Color.rgb(137, 230, 81),
        Color.rgb(240, 240, 30),
        Color.rgb(89, 199, 250),
        Color.rgb(250, 104, 104)
    )

    private fun setupChart(chart: LineChart, data: LineData, color: Int) {
        (data.getDataSetByIndex(0) as LineDataSet).circleHoleColor = color

        // no description text
        chart.description.isEnabled = false

        // chart.setDrawHorizontalGrid(false);
        //
        // enable / disable grid background
        chart.setDrawGridBackground(false)
        // chart.renderer.gridPaint.gridColor = Color.WHITE and 0x70FFFFFF

        // enable touch gestures
//        chart.isTouchEnabled = true

        // enable scaling and dragging
        chart.isDragEnabled = true
        chart.setScaleEnabled(true)

        // if disabled, scaling can be done on x- and y-axis separately
        chart.setPinchZoom(false)

        chart.setBackgroundColor(color)

        // set custom chart offsets (automatic offset calculation is hereby disabled)
        chart.setViewPortOffsets(10f, 0f, 10f, 0f)

        // add data
        chart.data = data

        // get the legend (only possible after setting data)
        val legend = chart.legend
        legend.isEnabled = false

        chart.axisLeft.isEnabled = false
        chart.axisLeft.spaceTop = 40f
        chart.axisLeft.spaceBottom = 40f
        chart.axisRight.isEnabled = false

        chart.xAxis.isEnabled = false

        // animate calls invalidate()...
        chart.animateX(2500)
    }

    private fun getData(count: Int, range: Float): LineData {
        val values = ArrayList<Entry>()

        for (i in 0 until count) {
            val value = (Math.random() * range + 3).toFloat()
            values.add(Entry(i.toFloat(), value))
        }

        // create a dataset and give it a type
        val set1 = LineDataSet(values, "DataSet 1")
        // set1.fillAlpha = 110
        // set1.fillColor = Color.RED

        set1.lineWidth = 1.75f
        set1.circleRadius = 5f
        set1.circleHoleRadius = 2.5f
        set1.color = Color.WHITE
        set1.setCircleColor(Color.WHITE)
        set1.highLightColor = Color.WHITE
        set1.setDrawValues(false)

        // create a data object with the data sets
        return LineData(set1)
    }
}