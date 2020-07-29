package com.lanxingyu.util;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class LoadJson {
	public static void main(String[] args) {
		 try {
			//创建JSON解析器
			JsonParser parse = new JsonParser();
			//创建JsonObject
			JsonObject json = (JsonObject)parse.parse(new FileReader("src/questionnaire.json"));
			//得到数组
			JsonArray content = json.get("content").getAsJsonArray();
			
			JsonObject subObject = content.get(1).getAsJsonObject();
			System.out.println(subObject.get("description").getAsString());
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
