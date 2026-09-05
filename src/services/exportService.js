// Academic Document Generator: Formats College Project Synopsis and SRS
export function generateSynopsisMarkdown(project, candidateInfo = {}) {
  const {
    studentName = 'Student / Engineering Candidate',
    rollNumber = 'FYP-2026-ENG',
    department = 'Department of Computer Science & Engineering',
    institution = 'University Institute of Technology',
    advisor = 'Assigned Project Guide / Mentor'
  } = candidateInfo;

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const titleUpper = (project?.title || 'Project Blueprint').toUpperCase();
  const domainUpper = (project?.domain || 'General Computer Science').toUpperCase();
  const ambitionUpper = (project?.targetAmbition || 'Capstone Defense').toUpperCase();

  return `# PROJECT SYNOPSIS & SYSTEM REQUIREMENTS SPECIFICATION (SRS)

## ${titleUpper}

**Domain / Specialization:** ${domainUpper}  
**Target Milestone:** ${ambitionUpper}  
**Academic Year:** 2025 – 2026  
**Date of Submission:** ${dateStr}  

---

### 1. CANDIDATE & ADVISORY DETAILS
- **Investigator(s):** ${studentName} (${rollNumber})
- **Department:** ${department}
- **Institution:** ${institution}
- **Faculty Guide / Advisor:** ${advisor}

---

### 2. ABSTRACT & INTRODUCTION
${project?.synopsis?.abstract || project?.summary || 'No abstract provided.'}

### 3. PROBLEM STATEMENT & RESEARCH MOTIVATION
${project?.problemStatement || 'Problem statement pending definition.'}

#### 3.1 Cliché vs. Proposed Novelty Pivot
- **Common Industry/Academic Cliché:** ${project?.clicheVsNovelty?.clicheIdea || 'Standard generic monolithic setup'}
- **Proposed Scientific Innovation:** ${project?.clicheVsNovelty?.noveltyPivot || 'Decentralized, low-latency verifiable architecture'}
- **Evaluated Novelty Index:** ${project?.noveltyScore || 90}%

---

### 4. SYSTEM ARCHITECTURE & DATA FLOW
The proposed architecture is organized into tiered subsystems:

${(project?.architecture?.layers || []).map((layer, idx) => `
#### 4.${idx + 1} ${layer?.name || 'Architecture Tier'}
- **Technologies:** \`${layer?.tech || 'Standard Toolchain'}\`
- **Description:** ${layer?.desc || ''}
- **Sub-components:** ${(layer?.nodes || []).join(', ')}
`).join('\n')}

#### 4.5 End-to-End Pipeline Execution
${(project?.architecture?.dataFlow || []).map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

---

### 5. TECHNICAL STACK & ARCHITECTURAL JUSTIFICATION
| Component Tier | Chosen Technology | Engineering Rationale | Alternative Evaluated |
| :--- | :--- | :--- | :--- |
${(project.techStack || []).map(t => `| **${t.category}** | \`${t.tech}\` | ${t.rationale} | ${t.alternative} |`).join('\n')}

---

### 6. SCOPE & FEATURE HIERARCHY
#### 6.1 Phase 1: Minimum Viable Product (MVP)
${(project.featureMatrix?.mvp || []).map(f => `- [x] ${f}`).join('\n')}

#### 6.2 Phase 2: Core Engineering Differentiators
${(project.featureMatrix?.advanced || []).map(f => `- [ ] ${f}`).join('\n')}

#### 6.3 Phase 3: Hackathon / Defense Wow Factors
${(project.featureMatrix?.wowFactor || []).map(f => `- [ ] ${f}`).join('\n')}

---

### 7. 12-WEEK IMPLEMENTATION ROADMAP
| Timeline | Engineering Focus | Tangible Deliverable & Viva Checkpoint |
| :--- | :--- | :--- |
${(project.weeklyRoadmap || []).map(r => `| **${r.week}** | ${r.focus} | ${r.milestone} |`).join('\n')}

---

### 8. HARDWARE & SOFTWARE SPECIFICATIONS
- **Hardware Requirements:** ${project.synopsis?.hardwareSpecs || 'Standard 64-bit multi-core computing platform with 16GB RAM.'}
- **Software Dependencies:** ${project.synopsis?.softwareSpecs || 'Modern Unix/Linux environment, Node.js, Python runtime, and target toolchains.'}

---

### 9. ANTICIPATED VIVA EXAMINATION DEFENSE PROOFS
${(project.vivaQuestions || []).map((q, idx) => `
**Q${idx + 1}: ${q.question}**  
*Examiner Focus:* ${q.examinerFocus}  
*Expected Defense Formulation:* ${q.modelAnswerSnippet}
`).join('\n')}

---
*Generated autonomously via NovaCapstone AI — Academic Engineering Suite*
`;
}

export function downloadMarkdownFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_synopsis.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printDocument() {
  window.print();
}
