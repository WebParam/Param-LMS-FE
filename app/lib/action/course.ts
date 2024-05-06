"use server"
import { redirect } from "next/navigation";

function generateRandomUserId(length?: number) {
  length = length || 8;
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function createCourse(formData: FormData) {
  const userId = generateRandomUserId();
  const title = formData.get("title");
  const description = formData.get("description");
  const instructorName = formData.get("instructorName");
  const logoUrl = formData.get("logoUrl");

    console.log("title: ", title, " description ", description, " instructorName ", instructorName, " logoUrl ", logoUrl);
    console.log("url: ", `/protected/admin/courses/${userId}?title=${title}&description=${description}&instructorName=${instructorName}&logoUrl=${logoUrl}`);
    
  redirect(
    `/protected/admin/courses/${userId}?id=${userId}&title=${title}&description=${description}&instructorName=${instructorName}&logoUrl=${logoUrl}`
  );
}
