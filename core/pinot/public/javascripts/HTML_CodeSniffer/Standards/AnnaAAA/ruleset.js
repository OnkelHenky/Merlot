/**
 *  Anna´s ruleset is part of Merlot
 *  Copyright (c) by Alexander Henka, 19.09.14
 *  Project URL: https://github.com/OnkelHenky/Merlot
 *
 * +--------------------------------------------------------------------------+
 * | LICENSE INFORMATION                                                      |
 * | ===================                                                      |
 * |                                                                          |
 * | Licensed under the Apache License, Version 2.0 (the "License");          |
 * | you may not use this file except in compliance with the License.         |
 * | You may obtain a copy of the License at                                  |
 * |                                                                          |
 * | http://www.apache.org/licenses/LICENSE-2.0                               |
 * |                                                                          |
 * | Unless required by applicable law or agreed to in writing, software      |
 * | distributed under the License is distributed on an "AS IS" BASIS,        |
 * | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 * | See the License for the specific language governing permissions and      |
 * | limitations under the License.                                           |
 * +--------------------------------------------------------------------------+
 *
 * +--------------------------------------------------------------------------+
 * | NOTICE                                                                   |
 * | ======                                                                   |
 * | This file is based on the ruleset and sniff implementation of            |
 * | the HTML CodeSniffer                                                     |
 * +--------------------------------------------------------------------------+
 * | HTML CodeSniffer Copyright (c) 2012, Squiz Pty Ltd (ABN 77 084 670 600)  |
 * | All rights reserved.                                                     |
 * +--------------------------------------------------------------------------+
 */

window.HTMLCS_AnnaAAA = {
    name: 'AnnaAAA',
    description: 'Accessibility Guidelines for Anna (AAA)',
    sniffs: [
        {
            standard: 'WCAG2AAA',
            include: [
                'Principle1.Guideline1_1.1_1_1', // A, Non-text Content: All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.
                'Principle1.Guideline1_2.1_2_1', // A, Audio-only and Video-only (Prerecorded) - Provide a alternative  for time based media
                'Principle1.Guideline1_2.1_2_2', // A, Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such
                'Principle1.Guideline1_2.1_2_3', // A, An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.
                'Principle1.Guideline1_3.1_3_2', // A, When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.
                'Principle1.Guideline1_4.1_4_1', // A, Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element
                'Principle2.Guideline2_1.2_1_1', // A, All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.
                'Principle2.Guideline2_1.2_1_2', // A, No Keyboard Trap. If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.
                'Principle2.Guideline2_2.2_2_1', // A, Time Adjustable
                'Principle2.Guideline2_2.2_2_2', // A, Pause, Stop, Hide. Provide the user with enough time to read and use the content of a web page.
                'Principle2.Guideline2_4.2_4_1', // A, A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.
                'Principle2.Guideline2_4.2_4_2', // A, Web pages have titles that describe topic or purpose.
                'Principle2.Guideline2_4.2_4_4', // A, The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.
                'Principle3.Guideline3_1.3_1_1', // A, The default human language of each Web page can be programmatically determined
                'Principle3.Guideline3_2.3_2_1', // A, When any component receives focus, it does not initiate a change of context.
                'Principle3.Guideline3_3.3_3_1', // A, If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
                'Principle3.Guideline3_3.3_3_2', // A, Labels or instructions are provided when content requires user input.
                'Principle4.Guideline4_1.4_1_2', // A, For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.

                'Principle1.Guideline1_2.1_2_4', // AA, Captions are provided for all live audio content in synchronized media.
                'Principle1.Guideline1_2.1_2_5', // AA, Audio description is provided for all prerecorded video content in synchronized media.
                'Principle1.Guideline1_4.1_4_5', // AA, Images of Text. Using images to display a text-content. Normally this should be refused (as it is in SC1.4.9), besides if theres is text inside of a company logo - here the text and the image are considered as one compoent. Image-texts have to be adaptable to the user and clear viewable with 200% zoom. A developer hast to take care, that the image accomondates to the users needs.
                'Principle2.Guideline2_4.2_4_7', // AA, Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
                'Principle2.Guideline3_1.3_1_2', // AA, The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.
                'Principle2.Guideline3_3.3_3_3', // AA, If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.

                'Principle2.Guideline1_2.1_2_8', // AAA, An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media. In comparison to SC1.2.1 (A) and SC1.2.4,1.2.3 (AA) - for ervery time-based media content is a 100%  alternative version for people with disabilties provided
                'Principle2.Guideline1_2.1_2_9', // AAA, An alternative for time-based media that presents equivalent information for live audio-only content is provided. In comparison to SC1.2.1 (A) and SC1.2.4,1.2.3 (AA) - for ervery time-based media content is a 100%  alternative version for people with disabilties provided
                'Principle2.Guideline1_4.1_4_9', // AAA, Images of Text (No Exception) - NO text-images allowed, exceptions are figurative marks - like company logos, which are including text and graphical content
                'Principle2.Guideline2_1.2_1_3', // AAA, All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes. (No Exceptions!)
                'Principle2.Guideline2_2.2_2_4', // AAA, Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.
                'Principle2.Guideline2_4.2_4_9', // AAA, A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.
                'Principle2.Guideline2_4.2_4_10',// AAA, Section headings are used to organize the content. This is meant for paragraphs in written content
                'Principle2.Guideline3_1.3_1_3', // AAA, A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.
                'Principle2.Guideline3_1.3_1_4', // AAA, A mechanism for identifying the expanded form or meaning of abbreviations is available.
                'Principle2.Guideline3_1.3_1_6'  // AAA, A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.
            ]
        }
    ],
    getMsgInfo: function(code) {
        return HTMLCS_WCAG2AAA.getMsgInfo(code);
    }
};