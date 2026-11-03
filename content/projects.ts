export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  tech: string[]
  github: string
  video?: string
  live?: string
}

export const projects: Project[] = [
  {
    id: "adapt",
    title: "A.D.A.P.T.",
    tagline: "Autonomous Drone Path Tracking",
    description:
      "A weather-informed multi-base UAV relief mission planner that converts annotated flood rasters and Open-Meteo weather data into executable QGroundControl WPL 110 missions. Implements D* Lite path planning, morphological flood dilation modeling, dry-ground drop allocation, and ArduCopter SITL simulation.",
    image: "/project_imgs/drone.webp",
    tech: ["Python", "OpenCV", "D* Lite", "MAVLink / SITL", "QGroundControl", "NumPy"],
    github: "https://github.com/TSaha4/A.D.A.P.T.-Autonomous-Drone-for-Adaptive-Path-Tracking",
  },
  {
    id: "listen",
    title: "LISTEN",
    tagline: "Explainable Spoken QA Network",
    description:
      "An explainable audio/video question-answering framework combining Faster-Whisper ASR, FAISS vector indexing, and a 2-layer Graph Attention Network (GAT) over multi-relational evidence graphs. Delivers grounded answers via Google Gemini with segment citations, SHAP token attribution, and counterfactual sensitivity testing.",
    image: "/project_imgs/listen.webp",
    tech: ["FastAPI", "React", "PyTorch Geometric (GAT)", "Faster-Whisper", "FAISS", "Google Gemini", "SHAP"],
    github: "https://github.com/TSaha4/LISTEN-Layered-Interpretable-Speech-to-Text-Evidence-Network",
    video: "https://drive.google.com/file/d/1r-Vepi54ZoQkaH3Erb4P5y1y0idMkryk/view?usp=drive_link",
  },
  {
    id: "medibot",
    title: "MediBot",
    tagline: "AI Medical Chatbot",
    description:
      "An AI chatbot that predicts diseases from symptoms using a hybrid NLP pipeline combining semantic embeddings, fuzzy matching, and vector search for accurate, real-time responses.",
    image: "/project_imgs/medibot.webp",
    tech: ["Python", "Flask", "IBM Watson", "FAISS", "SentenceTransformers"],
    github: "https://github.com/TSaha4/MediBot---Virtual-medical-Chatbot",
  },
  {
    id: "feedback",
    title: "Feedback Classifier",
    tagline: "College Feedback Classifier",
    description:
      "A dual-model NLP system using DeBERTa and RoBERTa to classify feedback by category and sentiment, achieving 90%+ accuracy and enabling deeper insights into user opinions.",
    image: "/project_imgs/college.webp",
    tech: ["PyTorch", "Hugging Face Transformers", "scikit-learn"],
    github: "https://github.com/TSaha4/College_Feedback_Classifier",
  },
  {
    id: "upryt",
    title: "UPRYT",
    tagline: "RL-Based Posture Correction System",
    description:
      "A real-time posture analysis system that uses reinforcement learning to deliver adaptive feedback. Learns user behavior to optimize correction strategies, reducing alert fatigue while improving posture over time.",
    image: "/project_imgs/upryt.webp",
    tech: ["Python", "PyTorch", "OpenCV", "MediaPipe"],
    github: "https://github.com/TSaha4/Real_Time_Posture_Analysis_RL_Project",
  },
]
