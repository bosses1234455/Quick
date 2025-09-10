
export async function postReview(title, description) {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const combinedContent = `Title: ${title}\n\nDescription: ${description}`;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free", 
        messages: [
          {
            role: "system",
            content: `You are a content moderation assistant. Carefully review the provided ad title and description for inappropriate language, hate speech, racism, discrimination, harassment, explicit content, or any violations of community guidelines. 
            Respond ONLY with a valid JSON object containing:
            - 'approval_status' (boolean): true if the content is safe and appropriate for publishing, false otherwise.
            - 'issues_found' (array of strings): list any specific problems or violations detected.
            - 'suggested_improvements' (array of strings): clear recommendations to make the content acceptable, if needed.
            - 'confidence_score' (number): your confidence in this assessment, between 0 and 1.
            Do NOT repeat or include the ad title or description in your response.
            Do NOT include any explanation or text outside the JSON object.`
          },
          {
            role: "user",
            content: combinedContent
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const moderationResult = JSON.parse(data.choices[0].message.content);
    console.log('Moderation Result:', moderationResult);
    return moderationResult;
    
  } catch (error) {
    console.error('Error reviewing content:', error);
    return {
      approval_status: false,
      issues_found: ['Error during content review'],
      suggested_improvements: [],
      confidence_score: 0
    };
  }
}