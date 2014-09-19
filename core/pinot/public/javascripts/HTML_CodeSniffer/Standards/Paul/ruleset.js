/**
 *  Paul´s ruleset is part of Merlot
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
 * | Of the HTML CodeSniffer                                                  |
 * +--------------------------------------------------------------------------+
 * | HTML CodeSniffer Copyright (c) 2012, Squiz Pty Ltd (ABN 77 084 670 600)  |
 * | All rights reserved.                                                     |
 * +--------------------------------------------------------------------------+
 */

window.HTMLCS_Paul = {
    name: 'Paul',
    description: 'Accessibility Guidelines for Paul',
    sniffs: [
        {
            standard: 'WCAG2AAA',
            include: [
               'Principle1.Guideline1_1.1_1_1',
               'Principle1.Guideline1_2.1_2_1',
               'Principle1.Guideline1_2.1_2_2',
               'Principle1.Guideline1_2.1_2_3',
               'Principle1.Guideline1_3.1_3_1',
               'Principle1.Guideline1_3.1_3_1_A',
               'Principle1.Guideline1_3.1_3_2',
               'Principle1.Guideline1_3.1_3_3',
               'Principle1.Guideline1_4.1_4_1',
               'Principle1.Guideline1_4.1_4_2',
               'Principle2.Guideline2_1.2_1_1',
               'Principle2.Guideline2_1.2_1_2',
               'Principle2.Guideline2_2.2_2_1',
               'Principle2.Guideline2_2.2_2_2',
               'Principle2.Guideline2_3.2_3_1',
               'Principle2.Guideline2_4.2_4_1',
               'Principle2.Guideline2_4.2_4_2',
               'Principle2.Guideline2_4.2_4_3',
               'Principle2.Guideline2_4.2_4_4',
               'Principle3.Guideline3_1.3_1_1',
               'Principle3.Guideline3_2.3_2_1',
               'Principle3.Guideline3_2.3_2_2',
               'Principle3.Guideline3_3.3_3_1',
               'Principle3.Guideline3_3.3_3_2',
               'Principle4.Guideline4_1.4_1_1',
               'Principle4.Guideline4_1.4_1_2'
            ]
        }
    ],
    getMsgInfo: function(code) {
        return HTMLCS_WCAG2AAA.getMsgInfo(code);
    }
};
