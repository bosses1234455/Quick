
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
        model: "deepseek/deepseek-r1-0528:free", // or the exact model name you're using
        messages: [
          {
            role: "system",
            content: `You are a content moderation assistant. Analyze the following ad title and description for any language racism things like that and respond with a JSON object containing:
            - 'approval_status' (boolean): whether the content is appropriate
            - 'issues_found' (array of strings): specific problems identified
            - 'suggested_improvements' (array of strings): recommendations for improvement
            - 'confidence_score' (number): your confidence in this assessment (0-1)`
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
    console.log(moderationResult)
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