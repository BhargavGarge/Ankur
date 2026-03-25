import React, { useState, useRef, useEffect } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   ScrollView,
   TextInput,
   KeyboardAvoidingView,
   Platform,
   StatusBar,
   ActivityIndicator,
   Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, Trash2 } from "lucide-react-native";

const SERVER_URL = "http://192.168.0.6:3000/assistant";

export default function AIAssistant() {
   const [messages, setMessages] = useState([
      {
         id: "1",
         role: "assistant",
         content: "Hello! I'm Ankur Assistant. How can I help you today?",
      },
   ]);
   const [inputText, setInputText] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [lang, setLang] = useState("English");
   const scrollRef = useRef<ScrollView>(null);

   // Auto-scroll
   useEffect(() => {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
   }, [messages, isLoading]);

   const handleSend = async () => {
      if (!inputText.trim() || isLoading) return;

      const userMsg = { id: Date.now().toString(), role: "user", content: inputText };
      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsLoading(true);

      try {
         const response = await fetch(SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               question: userMsg.content,
               language: lang,
               context: "User just arrived in Germany",
               history: [...messages, userMsg].slice(-6),
            }),
         });

         const data = await response.json();
         if (data.answer) {
            setMessages((prev) => [
               ...prev,
               { id: (Date.now() + 1).toString(), role: "assistant", content: data.answer },
            ]);
         } else {
            throw new Error("No answer from AI");
         }
      } catch (err: any) {
         Alert.alert("Error", err.message || "Failed to fetch AI response");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
         <StatusBar barStyle="dark-content" />
         <View style={{ flex: 1 }}>
            <ScrollView ref={scrollRef} style={{ flex: 1, padding: 16 }}>
               {messages.map((msg) => (
                  <View
                     key={msg.id}
                     style={{
                        marginBottom: 12,
                        alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                     }}
                  >
                     <View
                        style={{
                           maxWidth: "80%",
                           padding: 12,
                           borderRadius: 20,
                           backgroundColor: msg.role === "user" ? "#1B4F72" : "#f0f0f0",
                        }}
                     >
                        <Text style={{ color: msg.role === "user" ? "#fff" : "#000" }}>{msg.content}</Text>
                     </View>
                  </View>
               ))}
               {isLoading && (
                  <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                     <ActivityIndicator size="small" color="#1B4F72" />
                     <Text style={{ marginLeft: 8, fontStyle: "italic", color: "#555" }}>
                        Ankur is thinking...
                     </Text>
                  </View>
               )}
            </ScrollView>

            <View style={{ padding: 16, borderTopWidth: 1, borderColor: "#eee" }}>
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                     value={inputText}
                     onChangeText={setInputText}
                     placeholder="Ask anything..."
                     style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        marginRight: 8,
                     }}
                     onSubmitEditing={handleSend}
                  />
                  <TouchableOpacity
                     onPress={handleSend}
                     disabled={!inputText.trim() || isLoading}
                     style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: inputText.trim() && !isLoading ? "#1B4F72" : "#ccc",
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <Send color="#fff" size={20} />
                  </TouchableOpacity>
               </View>

               <View style={{ flexDirection: "row", marginTop: 8 }}>
                  {["English", "Hinglish"].map((l) => (
                     <TouchableOpacity
                        key={l}
                        onPress={() => setLang(l)}
                        style={{
                           paddingHorizontal: 12,
                           paddingVertical: 4,
                           marginRight: 8,
                           borderRadius: 12,
                           backgroundColor: lang === l ? "#1B4F72" : "#eee",
                        }}
                     >
                        <Text style={{ color: lang === l ? "#fff" : "#000", fontSize: 12, fontWeight: "bold" }}>
                           {l}
                        </Text>
                     </TouchableOpacity>
                  ))}
                  <TouchableOpacity onPress={() => setMessages([messages[0]])} style={{ marginLeft: "auto" }}>
                     <Trash2 size={20} color="#888" />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </SafeAreaView>
   );
}