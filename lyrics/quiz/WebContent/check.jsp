<%@page import="com.lanxingyu.entity.Info"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>蓝总的问卷</title>
</head>
<body>
<%
	//Object obj=(Object)session.getAttribute("info");
	Object obj = (Object)request.getSession().getAttribute("info");
	if (obj == null) {
		response.sendRedirect("lanxingyu.html");
		return;
	} else {
		Info info = (Info) obj;
	}
%>
</body>
</html>