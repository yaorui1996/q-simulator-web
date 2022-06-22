# 线路编码器

### 介绍

设计思路是在网格化的 **格点** 放置 Gate，分为两类：**单比特门** 和 **多比特门**。

单比特门分为：Null 和 单比特有效门。Null 表示置空，仅起到填充作用，不对 Qubit 做任何操作。

单比特有效门包含：

Hadamard, PauliX, PauliY, PauliZ, S, T, SquareRootX, RotationX, RotationY, RotationZ, Write, Measurement

多比特门包含：

Swap, Control

线路运行是按照每个 Step 依次运行的，单个 Step 运行时如果格点是单比特门则只对单比特进行操作，如果格点是多比特门则和此 Step 上所有的其他多比特门按照 **Swap 门成对作用**，**所有的 Control 门共同作用**。

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
|_RotationX_||浮点数||
|_RotationY_||浮点数||
|_RotationZ_||浮点数||
|_Swap_||1 / 0|1 表示有效，0 表示无效视为 Null|
|_Control_||1 / 0|1 表示有效，0 表示无效视为 Null|
|_Write_||1 / 0| 1/0 表示 Qubit 重置为 1/0 态|
|_Measurement_||||
