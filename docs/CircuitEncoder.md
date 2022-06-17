# 线路编码器

### 介绍

设计思路是在网格化的 **格点** 放置 Gate，分为两类：**单比特门** 和 **多比特门**。

单比特门分为：Null 和 单比特有效门。Null 表示置空，仅起到填充作用，不对 Qubit 做任何操作。

单比特有效门包含：

Hadamard, PauliX, PauliY, PauliZ, S, T, SquareRootX, RotationX, RotationY, RotationZ, Write, Measurement

多比特门包含：

Swap, Control

线路运行是按照每个 Step 依次运行的，单个 Step 运行时如果格点是单比特门则只对单比特进行操作，如果格点是多比特门则和此 Step 上所有的其他多比特门按照 **多比特门联合操作方案** 共同操作。

多比特门联合操作方案：

单个 Step 上 **所有的 Swap 门共同作用**：总 Swap 门数量为 1 或 3 及以上时，所有 Swap 门都无效，即全部视为 Null；总 Swap 门数量为 2 时，执行这两个 Qubit 的 Swap 门操作。

单个 Step 上 **所有的 Control 门共同作用**：

- 首先将所有的 Control 门忽略，分析所有的其他门操作，包括 单比特有效门 和 所有的 Swap 门共同作用，如果所有的其他有效的门操作数量大于等于 1 ，说明有被 Control 的门存在，则所有的 Control 门设置为有效，它们共同作用在刚才分析的所有的其他有效的门操作上。
- 在分析所有的其他门操作时，如果是 Control 无效的门，包括 Null Write Measurement，视为所有的其他有效的门操作数量为 0。
- 当所有的其他有效的门操作数量为 0 时，如果仅有 1 个 Control 门，则此 Control 门设置为无效，视为 Null；如果有 2 及以上的 Control 门，则所有的 Control 门设置为有效，虽然它们没有控制任何东西，实际上和视为 Null 没有操作上的区别，但是目前前端渲染是按照此规则执行的。

举例：

绿色格点说明有效，灰色格点说明无效。

![](/docs/img/gui_example.jpg)

# 输入

### 数据结构

#### 实例：

![](/docs/img/circuit_example.jpg)

#### 说明：

将 Gate 矩阵存储为二维字符串数组，描述单个 Gate 的字符串为 _GateName_Value_.

#### 举例：

根据上面的实例，Qubit 数量为 3，Step 数量为 6.

- 数组为

|         |            |          |               |        |               |
| ------- | ---------- | -------- | ------------- | ------ | ------------- |
| Write_0 | Hadamard\_ | PauliZ\_ | Control_1     | Swap_1 | Measurement\_ |
| Write_1 | PauliX\_   | S\_      | SquareRootX\_ | Swap_1 | Measurement\_ |
| Write_0 | PauliY\_   | T\_      | Control_1     | Null\_ | Measurement\_ |

- 方案 1

```
Write_0,Write_1,Write_0;Hadamard_,PauliX_,PauliY_;PauliZ_,S_,T_;Control_1,SquareRootX_,Control_1;Swap_1,Swap_1,Null_;Measurement_,Measurement_,Measurement_
```

- 方案 2

```
0,0,Write_0
0,1,Write_1
0,2,Write_0
1,0,Hadamard_
1,1,PauliX_
1,2,PauliY_
2,0,PauliZ_
2,1,S_
2,2,T_
3,0,Control_1
3,1,SquareRootX_
3,2,Control_1
4,0,Swap_1
4,1,Swap_1
4,2,Null_
5,0,Measurement_
5,1,Measurement_
5,2,Measurement_
```

#### 定义：

缩写，欠定义，可以根据后端代码统一定义。
|全称 _GateName_|缩写 _GateNameAbbr_|_Value_|备注|
|-|-|-|-|
|_Null_|||仅表示占位|
|_Hadamard_||||
|_PauliX_||||
|_PauliY_||||
|_PauliZ_||||
|_S_||||
|_T_||||
|_SquareRootX_||||
|_RotationX_||浮点数|单位为 $\pi$|
|_RotationY_||浮点数|单位为 $\pi$|
|_RotationZ_||浮点数|单位为 $\pi$|
|_Swap_||1 / 0|1 表示有效，0 表示无效视为 Null|
|_Control_||1 / 0|1 表示有效，0 表示无效视为 Null|
|_Write_||1 / 0| 1/0 表示 Qubit 重置为 1/0 态|
|_Measurement_||||
