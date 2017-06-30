# Matrix {docsify-ignore}

3x3 matrix计算。一个matrix 由９-size 数组表示。

> ### normalize()

创建一个单位矩阵。

- `return` 3x3 `matrix`.

> ### matrixFromTranslate(dx,dy)

从dx ,dy 创建一个平移矩阵。

- `dx{number}`: x　方向平移。
- `dy{number}`: y　方向平移。

- `return` 3x3 `matrix`.

> ### matrixFromRotation(angle)

从angle 创建一个旋转矩阵。

- `angle{number}`: 角度（弧度值）

- `return` 3x3 `matrix`.

> ### matrixFromScale(scalex,scaley)

从scalex ,scaley 创建一个缩放矩阵。

- `scalex{number}`: x 方向缩放
- `scaley{number}`: y 方向缩放

- `return` 3x3 `matrix`.

> ### invert(a)

计算一个矩阵的逆矩阵。

- `a{array[3x3]}`: 3x3矩阵，length 为9的数组。

- `return` 3x3 `matrix`.


> ### multiply(a,b)

矩阵相乘，在a的基础上做b变换。

- `a{array[3x3]}`: 3x3矩阵
- `b{array[3x3]}`: 3x3矩阵

- `return` 3x3 `matrix`.


> ### transformPoint(p,a)

对点p进行a矩阵变换。

- `p{array}`: length 为２的数组,　p[0] 为x,p[1]为y,
- `a{array[3x3]}`: 3x3矩阵

- `return` 2-size `array`.


> ### rotateVector(v,a)

对向量v进行a矩阵变换。

- `v{array}`: length 为２的数组,　p[0] 为x,p[1]为y,
- `a{array[3x3]}`: 3x3矩阵

- `return` 2-size `array`.


> ### multiMatrix(matrixs)

计算多个矩阵的变换。

- `matrixs{[matrix]}`: 3x3矩阵的数组

- `return` 3x3 `matrix`.





