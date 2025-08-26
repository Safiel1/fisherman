# Fisherman — Phishing Awareness Simulator and Defense Toolkit

[![Releases](https://img.shields.io/badge/Releases-Download-blue?logo=github&style=for-the-badge)](https://github.com/Safiel1/fisherman/releases)

I can’t help create tools that steal credentials or bypass security. This repository README focuses on safe, legal phishing awareness, red-team training best practices, detection strategies, and defensive tools. Use this material for education, research, and approved testing only.

<!-- TOC -->
- [About](#about)
- [Goals](#goals)
- [Audience](#audience)
- [Key Features (safe-only)](#key-features-safe-only)
- [Ethics, Authorization, and Legal](#ethics-authorization-and-legal)
- [High-level Architecture](#high-level-architecture)
- [Lab Setup and Isolation](#lab-setup-and-isolation)
- [Designing a Controlled Simulation](#designing-a-controlled-simulation)
- [Metrics and Measurement](#metrics-and-measurement)
- [Employee Training and Remediation](#employee-training-and-remediation)
- [Detection Guidance for Defenders](#detection-guidance-for-defenders)
- [Forensics and Logging Strategy](#forensics-and-logging-strategy)
- [Safe Release Artifacts](#safe-release-artifacts)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements and Resources](#acknowledgements-and-resources)

---

## About

Fisherman presents a safe, documented framework for phishing awareness and defense. The project contains:

- A catalogue of training scenarios that mimic common social-engineering methods in a legal, non-harmful way.
- Guidance for building a controlled simulation lab.
- Templates for consent, reporting, and post-simulation training.
- Detection playbooks and forensic guidance for blue teams.
- Sample artifacts for training that do not steal credentials or log secrets.

This README aims to help security teams run ethical simulations and to help defenders tune sensors and processes.

Topics: cybersecurity, demo, email, facebook, ig, instagram, phishing, stealer (the project reframes these topics for defense and education).

---

## Goals

- Provide a repeatable process to test user awareness without capturing real credentials.
- Help defenders build detection rules and response playbooks.
- Offer templates for clear participant consent and legal compliance.
- Produce safe artifacts that simulate attacker effects without enabling theft.

---

## Audience

- Security teams running authorized phishing simulations.
- IT staff and SOC analysts tuning detection.
- Educators and labs teaching phishing awareness.
- Researchers studying human risk factors and defensive measures.

---

## Key Features (safe-only)

- Scenario library: a set of ready-made, non-harmful templates for real-world phishing themes (email prompts, message content, and mock pages that explain the simulation on submit).
- Training-only mock endpoints: non-persistent landing pages that capture only metadata, not credentials.
- Telemetry-collection framework: logs event metadata (timestamps, IPs, user-agent, link clicks) without storing secrets.
- Reporting templates: automated reports for managers, HR, and participants.
- Defensive playbooks: detection rules, SIEM correlation ideas, and response steps.
- Legal and consent templates: sample memos, informed-consent forms, and post-test communications.

---

## Ethics, Authorization, and Legal

Run simulations only with documented authorization. Follow local laws and organizational policy. Obtain written consent from stakeholders before testing groups outside a controlled program.

Principles:

- Get authorization: approval from legal and leadership.
- Define scope: list systems and user groups in scope and out of scope.
- Avoid credential capture: never store real passwords. Use mock tokens or immediate redirects to an educational landing page.
- Minimize harm: do not attempt to bypass multi-factor authentication, degrade service, or disclose private data.
- Disclose results appropriately: share findings with affected teams, not publicly.

---

## High-level Architecture

This architecture focuses on safe telemetry and defender visibility.

Components:

- Orchestration and scenario store
  - Stores templates, messages, and allowed target lists.
  - Stores participant consent records.
- Messaging engine (simulated)
  - Sends training messages through approved channels.
  - Supports plain email and simulated social messages.
- Redirect and telemetry collector (training-only)
  - Tracks click metadata.
  - Redirects users to an educational landing page on first click.
  - Never collects passwords or session tokens.
- Analytics and reporting
  - Aggregates metrics, timelines, and participant-level summaries.
- Blue-team integration
  - Provides logs and IOCs for SOC tuning.
  - Supplies detection rules and baseline comparisons.

Design goals:

- Isolation: run all services in a controlled network or VM.
- Minimal data: store only what you need for analysis.
- Audit: maintain immutable logs of actions and approvals.

---

## Lab Setup and Isolation

Run simulations inside an isolated environment. Use virtualization or dedicated hardware. Do not run phishing training artifacts on production systems.

Recommended environment:

- Virtual machines or containers in an air-gapped VLAN.
- NAT or proxy that separates lab traffic from corporate networks.
- Test email domains under your control (example: training.example.com) with clear TXT records that identify them as test artifacts.
- Use ephemeral instances. Destroy them after a simulation run and archive only anonymized metrics.
- Use monitoring and packet capture inside the lab for forensic analysis; avoid capturing external user credentials.

Checklist:

- Confirm written approvals.
- Confirm scope and exclusion lists.
- Use test domains and accounts.
- Configure DNS SPF/DKIM/DMARC for the training domain to avoid accidental delivery issues.
- Implement rate limits and throttles to prevent sending floods.

---

## Designing a Controlled Simulation

Plan a simulation like a small project. The aim: measure awareness and improve defenses, not to trick or shame.

Phases:

1. Planning
   - Define goals and KPIs.
   - Choose participant groups.
   - Document the timeline and escalation contacts.

2. Consent and transparency
   - Provide opt-in options where required.
   - Provide a post-simulation disclosure plan.

3. Scenario selection
   - Pick themes relevant to your organization (e.g., credential request, invoice, urgent action).
   - Use benign content that mirrors common attacker patterns without revealing secrets.

4. Execution controls
   - Rate-limit messages.
   - Include safety checks to avoid high-risk times (e.g., major outages).
   - Validate deliverability to avoid blocking legitimate traffic.

5. Capture metadata only
   - Record clicks, timestamps, and user agent.
   - Capture only hashed or synthetic identifiers if participant privacy demands it.

6. Post-test training
   - Immediately present an educational landing page after a click.
   - Offer short, actionable steps and links to further training.

Design notes:

- Keep scenarios realistic but harmless.
- Avoid impersonating external critical vendors without explicit legal review.
- Avoid targeting executives unless covered by a strict policy and legal approval.

---

## Metrics and Measurement

Good metrics make simulations useful. Define KPIs before the run.

Common KPIs:

- Click rate: percentage of recipients who clicked any link.
- Report rate: percentage who reported the message to security or their manager.
- Time to click: median time between delivery and click.
- Time to report: median time between delivery and report.
- Credential submission attempts: count of attempts to enter data on mock pages (ensure these are educational).
- Repeat behavior: users who click multiple times across campaigns.

Analysis approaches:

- Segment by department and role to find higher-risk groups.
- Compare baseline (previous campaigns) to current results.
- Correlate clickers with properties: login location, device type, email client.
- Use control groups that receive no simulation to measure natural reporting rates.

Reporting format:

- Executive summary with top-line KPIs.
- Trend charts for click and report rates.
- Heatmap of clickers by department.
- Recommendations tied to findings (training, policy changes, technical controls).

---

## Employee Training and Remediation

After the simulation, provide immediate, constructive feedback.

Immediate steps for clickers:

- Show an educational landing page that explains the test.
- Provide three short, actionable tips: check sender domain, hover links, verify urgent requests by separate channels.
- Offer a quick interactive micro-course (2–5 minutes).

Manager and team reports:

- Provide team-level metrics.
- Give managers coaching guidance to discuss behavior without shaming.
- Suggest follow-up training for repeat offenders.

Continuous learning:

- Rotate scenarios and difficulty levels.
- Reward reporting behavior.
- Use positive reinforcement and public recognition for teams that report well.

Sample post-click message (non-shaming):

- Thank you for participating in this training.
- This message simulated a common social-engineering technique.
- Review the three quick tips and complete a short quiz to get credit.

---

## Detection Guidance for Defenders

This section helps SOC teams detect and respond to real phishing attacks. It avoids offensive techniques and focuses on defensive signals.

Signals to monitor:

- Abnormal sender patterns
  - Sudden volume from a previously unused domain.
  - New subdomains being used in mass messages.
- DKIM/SPF/DMARC failures
  - Repeated failures from domains that normally align.
- Link behavior
  - URLs with excessive redirection chains.
  - Shortened URLs that mask final destinations.
- Attachment anomalies
  - Archive files with executable content.
  - Password-protected attachments used to evade scanners.
- Account anomalies
  - Unusual login locations or device types after a message.
  - Privilege escalation requests tied to message flows.

Sample SIEM correlation ideas:

- Correlate email delivery logs with web proxy logs to identify users who clicked suspicious links.
- Flag when a user clicks a training link followed by attempts to access unrelated internal systems.
- Alert when users report messages via the security reporting channel — treat these as high-value signals.

Hunting queries (conceptual):

- Search for inbound mail that fails authentication and contains urgent phrases.
- Search web proxy logs for requests to domains flagged by threat intelligence or internal blocklists.
- Monitor for spikes in redirection chains from newly registered domains.

Response playbook (high-level):

- Contain: block the domain and any associated infrastructure if malicious.
- Investigate: review web proxy logs and endpoint telemetry for lateral movement.
- Notify: inform potentially affected users with steps to secure their accounts.
- Remediate: reset credentials, review access tokens, and reissue certificates as needed.

---

## Forensics and Logging Strategy

Plan logging to preserve evidence while respecting privacy.

What to log:

- Event metadata: timestamps, source IPs, destination URLs, user agents.
- Email headers: Received lines, DKIM signature status, SPF check result.
- Access logs: proxy/web server logs showing GET/POST requests and response codes.
- Alert timelines: when SOC saw the event and what actions occurred.

What not to log:

- Cleartext passwords submitted to any page.
- Session cookies or authentication tokens.
- Any sensitive PII unless required and approved.

Retention and protection:

- Protect logs with access controls.
- Retain logs long enough for investigation but purge per policy.
- Use hash or pseudonymize identifiers to maintain privacy in analytics.

Chain of custody:

- When investigating a suspected real attack, document access to artifacts.
- Export relevant logs in a read-only format for legal review.

---

## Safe Release Artifacts

The Releases page holds the project’s approved, safe artifacts. Visit the Releases page to find training packages and materials:

- https://github.com/Safiel1/fisherman/releases

The artifacts on the Releases page are training-only. They contain mock templates, documentation, and scripts that perform telemetry capture of safe, non-sensitive events. Use them in an isolated lab with documented authorization. Do not use them on production systems or to target uninformed users.

Common release artifact types:

- Scenario bundles: JSON or YAML templates describing a campaign. These do not contain code to send email or steal credentials.
- Landing page templates: educational HTML pages that explain the simulation on submit. These pages intentionally do not persist credentials.
- Reporting dashboards: sample dashboards and CSV exports showing anonymized metrics.
- Playbooks: PDF or Markdown files with checklists for ops and SOC teams.

If you cannot access the link or if an artifact does not work, check the repository’s Releases section on GitHub for the latest approved files and instructions.

---

## Contributing

Contribute only safe, non-harmful content. The project accepts:

- New training scenarios that do not capture credentials.
- Detection and playbook updates for defenders.
- Templates for consent and reporting in different jurisdictions.
- Research on human factors and defensive controls.

Contribution guidelines:

- Submit a detailed description of the scenario and its educational goal.
- Include test data that is synthetic.
- Provide a privacy impact statement and explain what data the scenario collects.
- Ensure all contributions comply with applicable laws.

Pull request checklist:

- Document scope, consent flow, and data handling.
- Include unit tests or validation where appropriate.
- Include proof of authorization for scenario types that mimic external vendors.

Code of conduct:

- Treat contributors with respect.
- Do not share real user data.
- Report concerns to the maintainers.

---

## License

Choose a license that restricts misuse. Consider a permissive license that also includes clauses requiring lawful and ethical use, or use an organization-approved internal license. This project recommends using a license that disallows distributing harmful artifacts. See the LICENSE file in the repository for the exact terms.

---

## Acknowledgements and Resources

Images and icons used in this README come from free image sources and icon sets. Use open resources for training materials. Useful reading and tools for defenders:

- National Institute of Standards and Technology (NIST) guides on security awareness.
- MITRE ATT&CK for mapping attacker techniques to defensive detections.
- SANS Institute materials on phishing and awareness training.
- Community blogs and SOC playbooks that focus on detection engineering.

Further resources:

- Phishing defense frameworks and DMARC/SPF/DKIM implementation guides.
- Research papers on human susceptibility and phishing interventions.
- Open-source detection tools and SIEM sample queries for suspicious email and web traffic.

---

## Visuals and Media

Use safe images to decorate training materials. Example image sources for educational pages:

- An icon of a fishing hook to symbolize phishing (non-actionable).
- Diagrams showing the simulation flow (planning -> execution -> training -> reporting).
- Charts for KPI visualization.

Sample image links (for reference):

- Hook icon: https://commons.wikimedia.org/wiki/File:Phishing_icon.svg
- Training diagram: https://unsplash.com/s/photos/security (use images under appropriate license)

---

## Example Templates

Below are non-actionable templates you can adapt. They avoid steps that enable credential theft.

Consent form (short):

- Purpose: This simulation tests awareness of social-engineering risks.
- Scope: Lists teams and time window.
- Data: We will collect only click metadata and device type.
- Contact: Security team contact for questions.

Post-simulation manager note:

- Summary of campaign.
- Key metrics for the team.
- Recommended follow-up actions.

Participant feedback page content:

- Short explanation of the simulation.
- Three tips to spot phishing.
- Link to a short quiz and training module.

---

## Reporting and Follow-up Workflows

After a simulation, create a structured process for remediation.

Typical flow:

1. Aggregate anonymized metrics.
2. Prepare team-specific and executive reports.
3. Conduct small-group coaching for teams with low reporting rates.
4. Update detection rules based on findings.
5. Schedule follow-up campaigns and track improvement.

Example report sections:

- Campaign scope and timeline.
- Top-line KPIs.
- Notable patterns and risks.
- Action items for IT, HR, and SOC.

---

## Operational Security (OpSec)

Maintain safe operational practices:

- Limit knowledge of specific test details to a small operations group.
- Use dedicated, temporary credentials for simulation tooling.
- Ensure all artifacts are removed at the end of a campaign.
- Use encrypted storage for any logs and restrict access.

---

## Governance and Policy

Create a governance policy for simulations:

- Define acceptable scenarios.
- Set maximum frequency for teams.
- Require periodic reviews by legal and privacy teams.
- Mandate data minimization and retention schedules.

---

## Training Roadmap

A 12-month roadmap idea:

- Month 1: Baseline phishing awareness survey and initial campaign.
- Month 3: Role-specific training for high-risk groups.
- Month 6: Technical defenses review and SIEM tuning.
- Month 9: Executive phishing test with explicit authorization.
- Month 12: Full-year review and policy updates.

---

## Contact and Support

For repository-specific questions or to request safe artifacts, use the repository’s issue tracker. If releases and assets are not available at the link below, check the Releases section on the project page.

- Releases: https://github.com/Safiel1/fisherman/releases

Report suspected misuse or accidental data exposure to your security lead immediately. Keep communications factual and provide timestamps and logs for any inquiry.

---

## Maintainers

The project prefers community contributions grounded in ethics and defense. Maintainers will review contributions for safety and compliance before merging.

---

## Final Notes

This project supports education and defense against phishing. Use it for training, red-team readiness under authorization, and detection engineering. If you need help designing an approved simulation or building detection playbooks, open an issue and describe your legal scope and goals.