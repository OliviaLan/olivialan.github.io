package com.lanxingyu.action;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStreamReader;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.dispatcher.DefaultActionSupport;
import org.apache.struts2.ServletActionContext;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.lanxingyu.entity.Info;
import com.opensymphony.xwork2.ActionContext;

public class InfoAction extends DefaultActionSupport {
	public String start() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		
		Info info = new Info();
		
		//获取当前运行环境根目录
		ActionContext ac = ActionContext.getContext();
		ServletContext sc = (ServletContext)ac.get(ServletActionContext.SERVLET_CONTEXT);
		String path = sc.getRealPath("/");
		//创建JSON解析器
		JsonParser parse = new JsonParser();
		//创建JsonObject
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path+"json\\questionnaire.json"),"UTF-8"));
		JsonObject json = (JsonObject)parse.parse(br);		
		//得到json数组
		JsonArray content = json.get("content").getAsJsonArray();
		JsonObject data = content.get(0).getAsJsonObject();
		
		int sumQue = content.size();
		int index = 0;
		String width = String.valueOf(((float)(index+1)/sumQue)*100)+"%";
		String quePosition = String.valueOf(index+1) + "/"+String.valueOf(sumQue);
		String title = data.get("title").getAsString();
		String description = data.get("description").getAsString();
		String choice1 = data.get("choice1").getAsString();
		String choice2 = data.get("choice2").getAsString();
		int trueIndex = data.get("trueIndex").getAsInt();
		String feedDescriptionOfTrue = data.get("feedDescriptionOfTrue").getAsString();
		String feedDescriptionOfFalse = data.get("feedDescriptionOfFalse").getAsString();
		
		info.setSumQue(sumQue);
		info.setIndex(index);
		info.setWidth(width);
		info.setQuePosition(quePosition);
		info.setTitle(title);
		info.setDescription(description);
		info.setChoice1(choice1);
		info.setChoice2(choice2);
		info.setTrueIndex(trueIndex);
		info.setFeedDescriptionOfTrue(feedDescriptionOfTrue);
		info.setFeedDescriptionOfFalse(feedDescriptionOfFalse);
		
		session.setAttribute("info", info);
		return SUCCESS;
	}
	public String next() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		
		Info info = new Info();
		
		//获取当前运行环境根目录
		ActionContext ac = ActionContext.getContext();
		ServletContext sc = (ServletContext)ac.get(ServletActionContext.SERVLET_CONTEXT);
		String path = sc.getRealPath("/");
		//创建JSON解析器
		JsonParser parse = new JsonParser();
		//创建JsonObject
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path+"json\\questionnaire.json"),"UTF-8"));
		JsonObject json = (JsonObject)parse.parse(br);		
		//得到json数组
		JsonArray content = json.get("content").getAsJsonArray();
		
		int index = (int)session.getAttribute("index")+1;
		JsonObject data = content.get(index).getAsJsonObject();
		
		int sumQue = content.size();
		
		String width = String.valueOf(((float)(index+1)/sumQue)*100)+"%";
		String quePosition = String.valueOf(index+1) + "/"+String.valueOf(sumQue);
		String title = data.get("title").getAsString();
		String description = data.get("description").getAsString();
		String choice1 = data.get("choice1").getAsString();
		String choice2 = data.get("choice2").getAsString();
		int trueIndex = data.get("trueIndex").getAsInt();
		String feedDescriptionOfTrue = data.get("feedDescriptionOfTrue").getAsString();
		String feedDescriptionOfFalse = data.get("feedDescriptionOfFalse").getAsString();
		
		info.setSumQue(sumQue);
		info.setIndex(index);
		info.setWidth(width);
		info.setQuePosition(quePosition);
		info.setTitle(title);
		info.setDescription(description);
		info.setChoice1(choice1);
		info.setChoice2(choice2);
		info.setTrueIndex(trueIndex);
		info.setFeedDescriptionOfTrue(feedDescriptionOfTrue);
		info.setFeedDescriptionOfFalse(feedDescriptionOfFalse);
		
		session.setAttribute("info", info);
		return SUCCESS;
	}
	
	
	public static void main(String[] args) {
		 try {
				JsonParser parse = new JsonParser();
				JsonObject json = (JsonObject)parse.parse(new FileReader("src/questionnaire.json"));
				JsonArray content = json.get("content").getAsJsonArray();
				
				JsonObject subObject = content.get(1).getAsJsonObject();
				System.out.println(subObject.get("description").getAsString());
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
}
