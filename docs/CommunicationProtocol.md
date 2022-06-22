# 通讯协议

符合后端对线路和结果的编码方案。

# 发送

## 字段参数

| 字段名      | 二级字段      | 类型    | 说明                   |
| ----------- | ------------- | ------- | ---------------------- |
| request     |               | object  | 固定字段               |
|             | submitCircuit | boolean | 是否提交线路           |
|             | acquireResult | boolean | 是否获取结果           |
| circuit     |               | obejct  | 符合后端线路编码方案   |
| sample      |               | int     | 采样次数 N>=1          |
| stateVector |               | boolean | 获取结果是否包含态矢量 |

## Json 模板

```
{
  "request": {
    "submitCircuit": "boolean",
    "acquireResult": "boolean"
  },
  "circuit": {CircuitJSON},
  "sample": "N: int",
  "stateVector": "boolean"
}
```

## Json 示例

### 提交线路且获取态矢量

```
{
  "request": {
    "submitCircuit": true,
    "acquireResult": true
  },
  "circuit": {CircuitJSON},
  "sample": 1,
  "stateVector": true
}
```

# 接收