// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use serde_json::Value;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn read_config() -> Result<String, String> {
  let path = "config.json";
  let config = fs::read_to_string(path).map_err(|e| e.to_string())?;
  Ok(config)
}

#[tauri::command]
fn get_api_base_url(config: String) -> Result<String, String> {
  let parsed_config: Value = serde_json::from_str(&config).map_err(|e| e.to_string())?;
  let base_url = parsed_config
    .get("api")
    .and_then(|api| api.get("base_url"))
    .and_then(|base_url| base_url.as_str())
    .ok_or("Missing 'api.base_url' setting")?;
  Ok(base_url.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, read_config, get_api_base_url])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
