import API from './axios';

// ── Local quick-reply map (no API call needed) ────────────────────────────
const quickReplies = {
  // Greetings
  greetings: {
    triggers: ['hi', 'hey', 'hello', 'namaste', 'namaskar', 'jai shree ram', 'hii', 'helo'],
    reply: `🙏 Namaste! Welcome to PujaConnect.\n\nI'm your personal pooja guide. How can I help you today?\n\nYou can ask me about:\n• Poojas for health, wealth, marriage or career\n• Best time to perform a pooja\n• Pandit recommendations and pricing\n• Any specific life situation you need guidance for`,
  },

  // Career / job
  career: {
    triggers: ['job promotion', 'career', 'job', 'promotion', 'business', 'success at work', 'interview'],
    reply: `🎯 For career growth and job promotion, these poojas are highly recommended:\n\n1. **Saraswati Puja** — Blesses you with wisdom and sharp intellect\n2. **Ganesh Puja** — Removes obstacles on your career path\n3. **Surya Puja** — Enhances leadership and recognition at work\n4. **Lakshmi-Narayan Puja** — Brings prosperity and professional success\n\n💡 Best performed on Wednesdays or during Navratri for maximum benefit.\n\nWould you like me to find a pandit for any of these? 🙏`,
  },

  // Health
  health: {
    triggers: ['good health', 'health', 'wellness', 'illness', 'recovery', 'disease', 'healing', 'sick'],
    reply: `❤️ For good health and healing, these poojas are traditionally recommended:\n\n1. **Maha Mrityunjaya Puja** — The most powerful pooja for health and longevity\n2. **Dhanvantari Puja** — Dedicated to the God of Ayurveda and medicine\n3. **Sudarshana Homam** — Removes negative energies causing illness\n4. **Navagraha Shanti** — Balances planetary influences affecting health\n\n💡 Best performed on Sundays or during Ekadashi for maximum benefit.\n\nShall I recommend a verified pandit for any of these? 🙏`,
  },

  // Marriage
  marriage: {
    triggers: ['marriage', 'wedding', 'shaadi', 'vivah', 'marriage planning', 'engagement', 'kundali'],
    reply: `💑 For marriage blessings and planning, these poojas are essential:\n\n1. **Vivah Puja** — The sacred marriage ceremony rituals\n2. **Swayamvar Parvati Vrat** — Helps find the right life partner\n3. **Uma Maheshwar Puja** — Blesses couples with a harmonious marriage\n4. **Kundali Milan** — Astrological matching before the wedding\n5. **Mangal Dosh Nivaran** — Essential if Mangal dosha is present\n\n💡 Our pandits provide full wedding ceremony services with all rituals.\n\nWould you like to check pandit availability for your date? 🙏`,
  },

  // Wealth / money
  wealth: {
    triggers: ['money', 'prosperity', 'wealth', 'rich', 'financial', 'debt', 'loan', 'lakshmi'],
    reply: `💰 For wealth and financial prosperity, these poojas are highly effective:\n\n1. **Lakshmi Puja** — Invites the goddess of wealth into your home\n2. **Kubera Puja** — Dedicated to the treasurer of the gods\n3. **Akshaya Tritiya Puja** — Best performed on this auspicious day for wealth\n4. **Vastu Shanti** — Corrects energy flow in home or business premises\n5. **Sridha Puja** — Removes financial blockages and bad luck\n\n💡 Friday is the most auspicious day for wealth-related poojas.\n\nShall I connect you with a pandit? 🙏`,
  },

  // Peace / spirituality
  peace: {
    triggers: ['peace', 'stress', 'anxiety', 'calm', 'spiritual', 'meditation', 'mental health', 'tension'],
    reply: `☮️ For inner peace and spiritual well-being, these poojas bring comfort:\n\n1. **Shiva Abhishek** — Calms the mind and brings deep peace\n2. **Satyanarayan Katha** — A complete family ritual for peace and harmony\n3. **Hanuman Puja** — Builds courage and removes fear and anxiety\n4. **Rudra Abhishek** — Powerful ritual for peace and obstacle removal\n\n💡 Monday is ideal for Shiva-related poojas; Saturday for Hanuman Puja.\n\nWould you like a pandit recommendation? 🙏`,
  },
};

// ── Match a message to a local quick reply ────────────────────────────────
const getLocalReply = (message) => {
  const lower = message.toLowerCase().trim();

  for (const category of Object.values(quickReplies)) {
    if (category.triggers.some((trigger) => lower.includes(trigger))) {
      return { reply: category.reply, pooja: null, pandits: [] };
    }
  }

  return null;
};

// ── Main export ───────────────────────────────────────────────────────────
export const sendMessage = async (message) => {
  // Try local reply first — instant, no API needed
  const local = getLocalReply(message);
  if (local) return local;

  // Fall back to backend for anything not matched locally
  try {
    const response = await API.post('/chat', { message });
    return response.data;
  } catch (error) {
    const serverMsg = error.response?.data?.message || error.response?.data?.error;
    throw serverMsg
      ? { error: serverMsg }
      : { error: 'Failed to send message' };
  }
};