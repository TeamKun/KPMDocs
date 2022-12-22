# クエリ文字列

クエリは、KPM がプラグインを解決するために使用する文字列です。

---

## 書式

### 基本

+ `https://example.com/path/to/ExamplePlugin-1.0.0.jar`
+ `https://example.com/path/to/ExamplePlugin/download`

### GitHub

+ `https://github.com/example/ExamplePlugin`
+ `https://github.com/example/ExamplePlugin/releases/tags/1.0.0`
+ `https://github.com/example/ExamplePlugin/releases/download/1.0.0`
+ `https://github.com/example/ExamplePlugin/releases/download/1.0.0/ExamplePlugin-1.0.0.jar`

#### 省略形

+ `example/ExamplePlugin`  
+ `ExamplePlugin`
  `config.yml` で指定されたオーナー名は省略可能です。`example` が指定されている場合、`ExamplePlugin` は `example/ExamplePlugin` として解釈されます。

##### 省略形におけるバージョン指定

+ `example/ExamplePlugin@v1.2.3`

### Bukkit.org

+ `https://dev.bukkit.org/projects/exampleplugin`
+ `https://dev.bukkit.org/projects/exampleplugin/files/123456`
+ `https://dev.bukkit.org/projects/exampleplugin/files/123456/download`

### SpigotMC

+ `https://www.spigotmc.org/resources/exampleplugin.1234`
+ `https://www.spigotmc.org/resources/exampleplugin.1234/download?version=123456`

### CurseForge

+ `https://curseforge.com/minecraft/bukkit-plugins/exampleplugin`
+ `https://curseforge.com/minecraft/bukkit-plugins/exampleplugin/files/123456`
+ `https://curseforge.com/minecraft/bukkit-plugins/exampleplugin/files/123456/download`
