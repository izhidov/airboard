import os
from dotenv import load_dotenv
from langchain import PromptTemplate
from langchain_openai import ChatOpenAI  # Updated import
from langchain.chains import LLMChain
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
if openai_api_key is None:
    raise ValueError("No OpenAI API key found. Make sure it is set correctly.")
else:
    print('You have it')

app = Flask(__name__)
CORS(app)

# Initialize the ChatOpenAI LLM
llm = ChatOpenAI(model_name="gpt-4")

# Create a prompt template to generate a sequence of emojis
prompt_template = PromptTemplate(
    input_variables=["input_text", "gender"],
    template=(
        "You are a sophisticated emoji generator with a deep understanding of context, emotion, and action. "
        "Your task is to transform the following text into a compelling sequence of emojis that captures the "
        "nuances of the described scenario. Follow these detailed instructions:\n"
        "1. **Analyze the Context**: Identify the core actions, emotions, and subjects in the text. Consider both explicit and implicit meanings.\n"
        "2. **Reflect Emotions**: Use emojis to portray the emotional state of the subject. Choose expressive emojis that match the tone (e.g., joy, surprise, sadness).\n"
        "3. **Capture Key Actions**: Select emojis that vividly illustrate the primary actions taking place. Ensure that each emoji represents a unique action or element.\n"
        "4. **Maintain Sequence**: Arrange the emojis in the order of actions as described in the text. The flow should reflect the narrative's chronology.\n"
        "5. **Consider Gender Representation**: For person-related emojis, accurately represent the specified gender while ensuring diversity in expressions and roles.\n"
        "6. **Avoid Redundancy**: Each emoji should add value; avoid repeating similar emojis unless necessary for emphasis or clarification.\n"
        "7. **Brevity and Impact**: Your final output should be a concise line of emojis that succinctly conveys the essence of the text without extraneous elements.\n\n"
        "Respond with only the emojis, in a single line, separated by spaces, with no additional text or punctuation.\n\n"
        "Text: {input_text}\n"
        "Gender: {gender}\n"
        "Emojis:"
    ),
)






# Initialize the LangChain LLM chain with the prompt template
emoji_chain = LLMChain(llm=llm, prompt=prompt_template)

# Define a route to handle text input and return emojis
@app.route("/")

def home():
    title = "Emoji Converter"
    return render_template("index.html", title=title)

@app.route('/convert', methods=['POST'])

def convert():
    if request.method == 'POST':
        text = request.form.get('text')
        gender = request.form.get('gender', 'gender-neutral')  # Default to gender-neutral if not provided

        # Generate emojis based on the text and selected gender
        emoji_response = generate_emojis_based_on_gender(text, gender)

        return jsonify({"emojis": emoji_response})

def generate_emojis_based_on_gender(text, gender):
    # Use the LangChain model to generate emojis based on input text and selected gender
    generated_emojis = emoji_chain.run(input_text=text, gender=gender)
    return generated_emojis

if __name__ == '__main__':
    app.run(debug=True)
