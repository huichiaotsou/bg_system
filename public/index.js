const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // 阻止表单默认的提交行为

  // 获取表单元素的值
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var location = document.querySelector('input[name="location"]:checked').value;
  var saveData = document.getElementById("save-data").checked;

  // 创建一个包含表单数据的对象
  var formData = {
    name: name,
    phone: phone,
    email: email,
    location: location,
    saveData: saveData,
  };

  console.log("formData: ", formData);

  // 发送POST请求到服务器
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/form");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(formData));

  // 处理服务器响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("submit with success");
      // 在这里可以执行任何在表单提交成功后需要进行的操作
    }
  };
});
