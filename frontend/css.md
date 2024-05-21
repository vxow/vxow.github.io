# css

## BFC

难度：★★☆☆☆

### 概念

`BFC` 即 Block Formatting Contexts (块级格式化上下文)。
`BFC` 是一种特殊的上下文环境。当一个元素创建 `BFC` 后，就具备了一个完全独立的环境。
`BFC` 会影响当前元素和内部元素的布局表现，但不会影响跟外部元素之间的布局关系。

### 解决什么问题

- 解决浮动和定位引起的布局问题。
- 阻止：父元素高度塌陷。
- 防止：`margin` 合并。

### 创建BFC方法

- overflow：当一个元素的 `overflow` 属性值不是 visible、clip 时。比如：overflow: hidden、overflow: auto。
- float：即 `float` 属性值不为 none。
- position：即 `position` 属性值是 absolute 或 fixed。
- display：当一个元素的 `display` 属性设置成 flex-root、flex、grid、inline-block、table、table-cell、table-caption。
