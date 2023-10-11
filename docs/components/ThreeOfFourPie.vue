<template>
    <div id="pieChart" class="container"></div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
let data = [{
    name: "A产区",
    value: 754
},
{
    name: "B产区",
    value: 611
},
{
    name: "C产区",
    value: 400
},
];
const getArrayValue = (array, key) => {
    let keys = key || "value";
    let res = [] as any;
    if (array) {
        array.forEach((t) => {
            res.push(t[keys]);
        });
    }
    return res;
}

const array2obj = (array, key) => {
    let resObj = {};
    for (let i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
    }
    return resObj;
}

const getData = (data) => {
    let res = {
        series: [] as any,
        yAxis: [] as any
    };
    for (let i = 0; i < data.length; i++) {
        res.series.push(
            {
                name: '',
                type: 'pie',
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
                center: ["55%", "55%"],
                label: {
                    show: false
                },
                itemStyle: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                },
                data: [{
                    value: data[i].value,
                    name: data[i].name
                }, {
                    value: sumValue - data[i].value,
                    name: '',
                    itemStyle: {
                        color: "rgba(0,0,0,0)",
                        borderWidth: 0
                    },
                    tooltip: {
                        show: false
                    },
                    hoverAnimation: false
                }]
            });
        res.series.push({
            name: '',
            type: 'pie',
            silent: true,
            z: 1,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
            center: ["55%", "55%"],
            label: {
                show: false
            },
            itemStyle: {
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                borderWidth: 5,
            },
            data: [{
                value: 7.5,
                itemStyle: {
                    color: "rgb(3, 31, 62)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }, {
                value: 2.5,
                name: '',
                itemStyle: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }]
        });
        // res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
    }
    return res;
}

let arrValue = getArrayValue(data, "value");
let sumValue = eval(arrValue.join('+'));
let objData = array2obj(data, "name");
let optionData = getData(data)
onMounted(() => {
    initPie()
})
const initPie = () => {
    let myChart = echarts.init(document.getElementById('pieChart'));
    let arrName = getArrayValue(data, "name");
    let option = {
        backgroundColor: '#081736',
        legend: {
            show: true,
            icon: "circle",
            top: "18%",
            left: '60%',
            data: arrName,
            width: -5,
            itemWidth: 10,
            itemHeight: 10,
            // padding: [0, 5],
            itemGap: 48,
            formatter: function (name) {
                return "{title|" + name + "}"
            },
            textStyle: {
                rich: {
                    title: {
                        fontSize: 12,
                        lineHeight: 5,
                        color: "rgba(255,255,255,0.8)"
                    },
                    value: {
                        fontSize: 14,
                        lineHeight: 5,
                        color: "#fff"
                    }
                }
            },
        },
        tooltip: {
            show: true,
            trigger: "item",
            formatter: "{a}<br>{b}:{c}({d}%)"
        },
        color: ['#4862FF', '#16B3FF', '#15FBF9', '#EEB605', '#FF4304'],
        grid: {
            top: '16%',
            bottom: '53%',
            left: "50%",
            containLabel: false
        },
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                inside: true,
                textStyle: {
                    color: "#fff",
                    fontSize: 16,
                },
                show: true
            },
            data: optionData.yAxis
        }],
        xAxis: [{
            show: false
        }],
        series: optionData.series
    };
    myChart.setOption(option);
}

</script>

<style scoped lang='scss'></style>