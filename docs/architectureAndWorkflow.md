<p align="center">
  <a href="https://moodys.com" rel="noopener" target="_blank"><img width="72" src="./public/assets/images/icons/logo72.png" alt="Moodys">
  </a>
</p>

<div align="center">

![badge](https://img.shields.io/static/v1.svg?label=version&message=skeleton&color=red)
![badge](https://img.shields.io/static/v1.svg?label=team&message=Digital%20Insights)

</div>
<h1 align="center">MDC Screener V2 - Architecture and Workflow</h1>
<h3 align="center">@owner - Di Dev</h3>

## Base Filter (How to Implement)

In Screener v2 we currently inherit the BaseFilter and extend it by including
additional formatters and custom logic specific to the Screener project.

The BaseFilter can _also_ be implemented as follows, setting it via AG-Grid's column definition,
without any additional custom logic incorporated on top of it:

In this example, DefaultFilter simply inherits BaseFilter without adding any custom logic on top of it:

```tsx
import React, { forwardRef } from "react";
import { IFilterParams } from "ag-grid-community";
import { BaseFilterComponent } from "@components/Table/Filters/BaseFilter/BaseFilter";

export const DefaultFilterComponent = (
  filterParams: IFilterParams,
  ref: React.Ref<unknown>
) => {
  return <BaseFilterComponent refNew={ref} {...filterParams} />;
};

export const DefaultFilter = forwardRef(DefaultFilterComponent);
DefaultFilter.displayName = "DefaultFilter";
```

We can set DefaultFilter in the column definition as follows:

```jsx
columnDef.filter = DefaultFilter;
```
