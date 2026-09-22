const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const syllabus = [
  {
    title: "MILESTONE 01 — Computer & IT Fundamentals",
    description: "Learn how computers, operating systems, and basic security concepts work.",
    modules: [
      { title: "Module 01 — Computer Architecture", topics: ["CPU", "RAM", "Storage", "Processes", "Threads", "Kernel", "Operating systems", "BIOS/UEFI", "Virtualization"], quiz: 15 },
      { title: "Module 02 — Operating System Fundamentals", topics: ["Windows architecture", "Linux architecture", "Users", "Groups", "Permissions", "Processes", "Services", "File systems"], quiz: 20 },
      { title: "Module 03 — Virtualization", topics: ["VirtualBox", "VMware", "Virtual machines", "Snapshots", "NAT", "Bridged networking", "Host-only networking"], quiz: 15 },
      { title: "Module 04 — Security Fundamentals", topics: ["CIA Triad", "Authentication", "Authorization", "Accountability", "Threat", "Vulnerability", "Risk", "Attack surface", "Exploit", "Mitigation"], quiz: 25 }
    ],
    project: {
      title: "Build Your Own Cyber Security Lab",
      requirements: "Create Windows VM, Linux VM, Kali Linux VM, Vulnerable Web App, Network Lab, and Monitoring Machine."
    }
  },
  {
    title: "MILESTONE 02 — Networking Fundamentals",
    description: "Extremely important for cybersecurity: IP, protocols, architecture, and packet analysis.",
    modules: [
      { title: "Module 05 — Networking Basics", topics: ["IP addresses", "MAC addresses", "IPv4", "IPv6", "Subnetting", "CIDR", "Gateway", "DNS", "DHCP", "ARP"], quiz: 25 },
      { title: "Module 06 — Network Protocols", topics: ["TCP", "UDP", "HTTP", "HTTPS", "FTP", "SSH", "SMTP", "DNS", "DHCP", "ICMP"], quiz: 25 },
      { title: "Module 07 — Network Architecture", topics: ["LAN", "WAN", "VLAN", "VPN", "Proxy", "NAT", "Firewall", "Router", "Switch"], quiz: 20 },
      { title: "Module 08 — Packet Analysis", topics: ["Wireshark", "TCP handshake", "DNS traffic", "HTTP traffic", "TLS traffic", "Packet filtering"], quiz: 20 },
      { title: "Module 09 — Network Attacks", topics: ["ARP spoofing concepts", "DNS attacks", "DoS concepts", "MITM concepts", "Port scanning", "Service enumeration"], quiz: 25 }
    ],
    project: {
      title: "Network Security Analyzer",
      requirements: "Use Wireshark and Nmap to analyze a controlled lab network."
    }
  },
  {
    title: "MILESTONE 03 — Linux & Windows Security",
    description: "Securing the two most common enterprise operating systems.",
    modules: [
      { title: "Module 10 — Linux Fundamentals", topics: ["Linux commands", "Files", "Permissions", "Users", "Groups", "Processes", "Services", "SSH", "Bash"], quiz: 25 },
      { title: "Module 11 — Linux Security", topics: ["File permissions", "sudo", "SSH hardening", "Firewall", "Logs", "Cron", "Services", "Authentication"], quiz: 25 },
      { title: "Module 12 — Windows Fundamentals", topics: ["Windows services", "Registry", "Processes", "Users", "Groups", "PowerShell", "Event Viewer"], quiz: 20 },
      { title: "Module 13 — Windows Security", topics: ["Windows Defender", "Firewall", "Event logs", "PowerShell security", "User privileges", "Security policies"], quiz: 25 }
    ],
    project: {
      title: "Linux + Windows Security Hardening Lab",
      requirements: "Take intentionally vulnerable lab machines and document how to harden them."
    }
  },
  {
    title: "MILESTONE 04 — Programming for Cyber Security",
    description: "Code comfortably with Python, Bash, PowerShell, and JavaScript.",
    modules: [
      { title: "Module 14 — Python", topics: ["Variables", "Functions", "Loops", "Files", "Exceptions", "Classes", "Modules", "Requests", "JSON"], quiz: 30 },
      { title: "Module 15 — Bash", topics: ["Shell scripting", "Variables", "Conditions", "Loops", "Functions", "Automation"], quiz: 20 },
      { title: "Module 16 — PowerShell", topics: ["Commands", "Objects", "Pipelines", "Scripts", "Windows administration"], quiz: 20 },
      { title: "Module 17 — JavaScript for Security", topics: ["DOM", "Events", "Fetch", "Cookies", "LocalStorage", "APIs", "Browser security"], quiz: 25 },
      { title: "Module 18 — Security Automation", topics: ["Port scanner", "Log analyzer", "HTTP checker", "Hash checker", "IP reputation checker", "File integrity monitor"], quiz: 30 }
    ],
    project: {
      title: "Cyber Security Automation Toolkit",
      requirements: "Build automated tools for security analysis and monitoring."
    }
  },
  {
    title: "MILESTONE 05 — Cryptography & Security Fundamentals",
    description: "Understand encryption, hashing, PKI, and authentication.",
    modules: [
      { title: "Module 19 — Cryptography", topics: ["Encryption", "Decryption", "Symmetric encryption", "Asymmetric encryption", "AES", "RSA", "ECC"], quiz: 25 },
      { title: "Module 20 — Hashing", topics: ["SHA-256", "SHA-3", "Password hashing", "bcrypt", "Argon2", "Salt"], quiz: 20 },
      { title: "Module 21 — PKI", topics: ["Certificates", "Certificate Authority", "TLS", "HTTPS", "Public/private keys"], quiz: 25 },
      { title: "Module 22 — Authentication", topics: ["Password authentication", "MFA", "OTP", "Tokens", "Sessions", "OAuth", "OpenID Connect"], quiz: 25 }
    ],
    project: {
      title: "Secure Authentication System",
      requirements: "Build a lab application implementing secure authentication concepts."
    }
  },
  {
    title: "MILESTONE 06 — Web Security Fundamentals",
    description: "Learn web architecture and common OWASP vulnerabilities.",
    modules: [
      { title: "Module 23 — Web Architecture", topics: ["Browser", "Server", "Backend", "Database", "API", "Cookies", "Sessions"], quiz: 20 },
      { title: "Module 24 — OWASP", topics: ["Broken Access Control", "Cryptographic Failures", "Injection", "Security Misconfiguration", "Vulnerable Components", "Authentication Failures", "SSRF", "XSS"], quiz: 35 },
      { title: "Module 25 — HTTP Security", topics: ["Headers", "Cookies", "CORS", "CSP", "HSTS", "SameSite", "CSRF"], quiz: 25 },
      { title: "Module 26 — Browser Security", topics: ["Same-Origin Policy", "CORS", "CSP", "DOM security", "Storage security"], quiz: 20 }
    ],
    project: {
      title: "Build a Vulnerable Web Application Lab",
      requirements: "Build a vulnerable web application, then identify and fix the vulnerabilities."
    }
  },
  {
    title: "MILESTONE 07 — Web Application Penetration Testing",
    description: "Offensive security techniques for web applications.",
    modules: [
      { title: "Module 27 — Reconnaissance", topics: ["Information gathering", "Asset discovery", "Subdomains", "DNS enumeration", "Technology identification"], quiz: 20 },
      { title: "Module 28 — Scanning", topics: ["Nmap", "WhatWeb", "Nikto", "Burp Suite"], quiz: 20 },
      { title: "Module 29 — Burp Suite", topics: ["Proxy", "Repeater", "Intruder", "Decoder", "Comparer", "HTTP history"], quiz: 25 },
      { title: "Module 30 — Web Vulnerabilities", topics: ["XSS", "SQL Injection", "IDOR", "CSRF", "SSRF", "File upload vulnerabilities", "Path traversal", "Authentication weaknesses", "Authorization weaknesses"], quiz: 35 },
      { title: "Module 31 — API Security", topics: ["REST APIs", "GraphQL basics", "API authentication", "API authorization", "Rate limiting", "Input validation"], quiz: 25 }
    ],
    project: {
      title: "Web Application Security Assessment",
      requirements: "Perform recon, scanning, vulnerability identification, risk analysis, and produce a professional report."
    }
  },
  {
    title: "MILESTONE 08 — Network Security & Pentesting",
    description: "Assess and secure enterprise networks.",
    modules: [
      { title: "Module 32 — Network Recon", topics: ["Nmap", "Service discovery", "Port enumeration", "OS detection"], quiz: 20 },
      { title: "Module 33 — Network Vulnerabilities", topics: ["Misconfigured services", "Weak authentication", "Exposed services", "Insecure protocols"], quiz: 20 },
      { title: "Module 34 — Firewall & IDS", topics: ["Firewall architecture", "IDS", "IPS", "Network segmentation"], quiz: 20 },
      { title: "Module 35 — VPN Security", topics: ["VPN architecture", "IPsec", "OpenVPN", "WireGuard concepts"], quiz: 15 },
      { title: "Module 36 — Network Pentesting Methodology", topics: ["Recon", "Enumeration", "Vulnerability Analysis", "Controlled Exploitation", "Privilege Escalation", "Reporting"], quiz: 25 }
    ],
    project: {
      title: "Internal Network Security Assessment Lab",
      requirements: "Perform a full internal network security assessment."
    }
  },
  {
    title: "MILESTONE 09 — Active Directory & Windows Pentesting",
    description: "Master enterprise Windows environments and AD security.",
    modules: [
      { title: "Module 37 — Active Directory", topics: ["Domain", "Domain Controller", "Users", "Groups", "Organizational Units", "Group Policy"], quiz: 25 },
      { title: "Module 38 — Windows Authentication", topics: ["NTLM", "Kerberos", "Tickets", "SPNs"], quiz: 20 },
      { title: "Module 39 — AD Enumeration", topics: ["Users", "Groups", "Shares", "Services", "Permissions"], quiz: 20 },
      { title: "Module 40 — Privilege Escalation", topics: ["Misconfigured permissions", "Service weaknesses", "Credential exposure", "Token/privilege abuse"], quiz: 25 },
      { title: "Module 41 — AD Attack Paths", topics: ["Lateral movement concepts", "Credential abuse", "Delegation issues", "Trust relationships"], quiz: 25 }
    ],
    project: {
      title: "Enterprise Active Directory Security Lab",
      requirements: "Build a small AD environment and perform a controlled security assessment."
    }
  },
  {
    title: "MILESTONE 10 — SOC & Blue Team",
    description: "Defend systems through monitoring and analysis.",
    modules: [
      { title: "Module 42 — SOC Fundamentals", topics: ["SOC", "SIEM", "SOC analyst", "Security alerts", "Incident tickets"], quiz: 20 },
      { title: "Module 43 — Log Analysis", topics: ["Windows logs", "Linux logs", "Web server logs", "Authentication logs", "Firewall logs"], quiz: 25 },
      { title: "Module 44 — SIEM", topics: ["Splunk concepts", "Elastic Stack", "Microsoft Sentinel concepts"], quiz: 20 },
      { title: "Module 45 — Detection Engineering", topics: ["Indicators", "Detection rules", "Alerting", "Correlation", "Threat hunting"], quiz: 25 },
      { title: "Module 46 — Threat Intelligence", topics: ["IOC", "IP", "Domain", "Hash", "Malware indicators", "Threat feeds"], quiz: 20 }
    ],
    project: {
      title: "Mini SOC Lab",
      requirements: "Configure endpoint logs, SIEM detection, and investigate a mock incident."
    }
  },
  {
    title: "MILESTONE 11 — Digital Forensics & Incident Response",
    description: "Investigate and respond to security breaches.",
    modules: [
      { title: "Module 47 — Digital Forensics", topics: ["Evidence", "Disk images", "File systems", "Metadata", "Timeline analysis"], quiz: 25 },
      { title: "Module 48 — Memory Forensics", topics: ["RAM analysis", "Processes", "Network connections", "Loaded modules"], quiz: 20 },
      { title: "Module 49 — Incident Response", topics: ["Preparation", "Identification", "Containment", "Eradication", "Recovery", "Lessons Learned"], quiz: 25 },
      { title: "Module 50 — Threat Hunting", topics: ["Hypothesis-driven hunting", "Log correlation", "Behavioral indicators", "Suspicious activity"], quiz: 20 }
    ],
    project: {
      title: "Incident Response Simulation",
      requirements: "Investigate a controlled simulated compromise and create a complete incident report."
    }
  },
  {
    title: "MILESTONE 12 — Malware Analysis & Reverse Engineering",
    description: "Dissect and understand malicious software.",
    modules: [
      { title: "Module 51 — Malware Fundamentals", topics: ["Virus", "Worm", "Trojan", "Ransomware", "Spyware", "Rootkit"], quiz: 20 },
      { title: "Module 52 — Static Analysis", topics: ["File hashes", "Strings", "PE files", "Metadata", "Imports"], quiz: 25 },
      { title: "Module 53 — Dynamic Analysis", topics: ["Processes", "Files", "Registry", "Network activity", "Sandbox concepts"], quiz: 25 },
      { title: "Module 54 — Reverse Engineering", topics: ["Assembly fundamentals", "x86/x64 basics", "Debuggers", "Disassemblers", "Ghidra", "x64dbg", "strings", "PE analysis tools"], quiz: 30 }
    ],
    project: {
      title: "Malware Analysis Lab",
      requirements: "Analyze intentionally provided training samples in an isolated environment."
    }
  },
  {
    title: "MILESTONE 13 — Cloud Security",
    description: "Secure infrastructure in AWS, Azure, and GCP.",
    modules: [
      { title: "Module 55 — Cloud Fundamentals", topics: ["AWS", "Azure", "GCP concepts", "IAM", "Compute", "Storage", "Networking"], quiz: 20 },
      { title: "Module 56 — Cloud IAM", topics: ["Users", "Roles", "Policies", "Least privilege"], quiz: 20 },
      { title: "Module 57 — Cloud Network Security", topics: ["VPC", "Security groups", "Network ACL", "Private networks"], quiz: 20 },
      { title: "Module 58 — Cloud Application Security", topics: ["API security", "Secrets", "Containers", "Storage security"], quiz: 25 },
      { title: "Module 59 — Cloud Monitoring", topics: ["Cloud logs", "Security alerts", "Monitoring", "Incident response"], quiz: 20 }
    ],
    project: {
      title: "Cloud Security Assessment Lab",
      requirements: "Assess and secure a simulated cloud environment."
    }
  },
  {
    title: "MILESTONE 14 — DevSecOps & Application Security",
    description: "Integrate security into the software development lifecycle.",
    modules: [
      { title: "Module 60 — Secure SDLC", topics: ["Threat modeling", "Secure coding", "Code review", "Security testing"], quiz: 20 },
      { title: "Module 61 — SAST", topics: ["Static security analysis"], quiz: 15 },
      { title: "Module 62 — DAST", topics: ["Dynamic security testing"], quiz: 15 },
      { title: "Module 63 — Dependency Security", topics: ["Vulnerable packages", "Dependency scanning", "SBOM"], quiz: 20 },
      { title: "Module 64 — Container Security", topics: ["Docker security", "Image scanning", "Secrets", "Container isolation"], quiz: 25 },
      { title: "Module 65 — CI/CD Security", topics: ["GitHub Actions security", "Secrets", "Pipeline security", "Deployment security"], quiz: 20 }
    ],
    project: {
      title: "Secure CI/CD Pipeline",
      requirements: "Build a CI/CD pipeline with SAST, Dependency Scans, and Container Security checks."
    }
  },
  {
    title: "MILESTONE 15 — Red Team Operations",
    description: "Advanced adversary simulation.",
    modules: [
      { title: "Module 66 — Red Team Fundamentals", topics: ["Red team", "Blue team", "Purple team", "Attack lifecycle", "Rules of engagement"], quiz: 20 },
      { title: "Module 67 — Reconnaissance", topics: ["OSINT", "Asset discovery", "Domain intelligence", "Public exposure"], quiz: 20 },
      { title: "Module 68 — Initial Access Concepts", topics: ["Web vulnerabilities", "Credential exposure", "Misconfiguration"], quiz: 20 },
      { title: "Module 69 — Post-Exploitation Concepts", topics: ["Privilege escalation", "Persistence concepts", "Lateral movement", "Command and control concepts"], quiz: 25 },
      { title: "Module 70 — Reporting", topics: ["Executive summary", "Technical findings", "Evidence", "Risk", "Remediation"], quiz: 20 }
    ],
    project: {
      title: "Purple Team Exercise",
      requirements: "Simulate an authorized attack (Red) while detecting and investigating it (Blue)."
    }
  },
  {
    title: "MILESTONE 16 — Advanced Exploitation",
    description: "Deep dive into memory and binary exploitation.",
    modules: [
      { title: "Module 71 — Memory Fundamentals", topics: ["Stack", "Heap", "Registers", "Memory layout"], quiz: 25 },
      { title: "Module 72 — Binary Security", topics: ["Buffer overflow concepts", "Memory corruption", "Mitigations"], quiz: 25 },
      { title: "Module 73 — Exploit Development Fundamentals", topics: ["Debugging", "Crash analysis", "Controlled exploitation"], quiz: 25 },
      { title: "Module 74 — Binary Analysis", topics: ["ELF", "PE", "Assembly", "GDB", "Ghidra"], quiz: 20 }
    ],
    project: {
      title: "Controlled Exploit Development Lab",
      requirements: "Use intentionally vulnerable training binaries in an isolated environment."
    }
  },
  {
    title: "MILESTONE 17 — Security Architecture & System Design",
    description: "Design secure enterprise architectures.",
    modules: [
      { title: "Module 75 — Security Architecture", topics: ["Defense in depth", "Zero Trust", "Least privilege", "Segmentation"], quiz: 20 },
      { title: "Module 76 — Enterprise Security", topics: ["IAM", "Network security", "Endpoint security", "Data security", "Application security"], quiz: 25 },
      { title: "Module 77 — Threat Modeling", topics: ["Assets", "Threat actors", "Attack surfaces", "Attack paths", "Mitigations"], quiz: 25 },
      { title: "Module 78 — Security Design", topics: ["SaaS", "E-commerce", "Banking system", "API platform", "Cloud application"], quiz: 25 }
    ],
    project: {
      title: "Enterprise Security Architecture",
      requirements: "Design a complete secure architecture for a fictional company."
    }
  },
  {
    title: "MILESTONE 18 — AI Security",
    description: "Secure modern AI applications and systems.",
    modules: [
      { title: "Module 79 — AI Security Fundamentals", topics: ["LLM security", "AI threats", "Model risks", "Data leakage"], quiz: 20 },
      { title: "Module 80 — Prompt Injection", topics: ["Direct prompt injection", "Indirect prompt injection", "Tool manipulation"], quiz: 25 },
      { title: "Module 81 — AI Application Security", topics: ["RAG security", "Vector database security", "Agent security", "Tool permissions"], quiz: 25 },
      { title: "Module 82 — AI Red Teaming", topics: ["AI application testing", "Jailbreak testing", "Data leakage testing", "Agent abuse scenarios"], quiz: 25 },
      { title: "Module 83 — AI Defense", topics: ["Guardrails", "Input validation", "Output validation", "Permission boundaries", "Monitoring"], quiz: 25 }
    ],
    project: {
      title: "AI Security Testing Platform",
      requirements: "Build an application that evaluates an AI system for common security weaknesses."
    }
  },
  {
    title: "MILESTONE 19 — CYBER SECURITY EXPERT CAPSTONE",
    description: "Your final project combining Offensive, Defensive, and Architecture skills.",
    modules: [],
    project: {
      title: "🔐 Enterprise Cyber Defense Platform",
      requirements: "Build a complete security lab with Firewall -> Web Server -> Internal Network -> API -> AD -> SIEM. Perform recon, web/network/AD security testing, exploit, then defend with SIEM, Detection rules, and IR."
    }
  }
];

async function seedCyberSecurityMasterclass() {
  console.log('Seeding Cyber Security Expert Roadmap (19 Milestones)...');

  let career = await prisma.careerPath.findUnique({
    where: { slug: 'cyber-security-expert-2026' }
  });

  if (!career) {
    career = await prisma.careerPath.create({
      data: {
        title: 'Cyber Security Expert',
        slug: 'cyber-security-expert-2026',
        description: 'The complete roadmap from IT fundamentals to Advanced Exploitation, Cloud Security, and AI Security.',
        overview: 'Master both Red Team (Offensive) and Blue Team (Defensive) operations. This comprehensive 19-milestone career path is designed to take you from a beginner to an elite Cyber Security Expert.',
        coreSkills: 'Networking, Linux, Penetration Testing, SOC, Malware Analysis, Reverse Engineering, Cloud Security, DevSecOps',
        tools: 'Kali Linux, Wireshark, Nmap, Burp Suite, Splunk, Ghidra, Docker, AWS',
        estimatedDuration: '10-12 Months',
        status: 'PUBLISHED'
      }
    });
  } else {
    // Delete existing courses for this career to avoid duplicates on re-run
    await prisma.course.deleteMany({ where: { careerPathId: career.id } });
  }

  // Iterate over Milestones (Courses)
  for (let cIdx = 0; cIdx < syllabus.length; cIdx++) {
    const milestoneData = syllabus[cIdx];
    
    console.log("Creating " + milestoneData.title + "...");
    
    const course = await prisma.course.create({
      data: {
        careerPathId: career.id,
        title: milestoneData.title,
        slug: "milestone-" + (cIdx + 1) + "-cyber",
        description: milestoneData.description,
        status: 'PUBLISHED',
        order: cIdx + 1
      }
    });

    // Iterate over Modules
    if (milestoneData.modules && milestoneData.modules.length > 0) {
      for (let mIdx = 0; mIdx < milestoneData.modules.length; mIdx++) {
        const modData = milestoneData.modules[mIdx];
        
        const module = await prisma.module.create({
          data: {
            courseId: course.id,
            title: modData.title,
            status: 'PUBLISHED',
            order: mIdx + 1
          }
        });

        // Iterate over Topics (Lessons)
        for (let tIdx = 0; tIdx < modData.topics.length; tIdx++) {
          const topicName = modData.topics[tIdx];
          
          await prisma.lesson.create({
            data: {
              moduleId: module.id,
              title: topicName,
              content: "# " + topicName + "\n\nWelcome to the lesson on **" + topicName + "**.\n\nThis lesson covers the core concepts, syntax, and real-world applications of " + topicName + " in modern cybersecurity. More detailed video content and interactive exercises will be added soon.\n\n### Key Takeaways:\n- Understand the fundamentals.\n- Learn best practices.\n- Apply to real projects.",
              videoUrl: 'https://www.youtube.com/embed/ENrzD9HAZK4', // Default placeholder
              status: 'PUBLISHED',
              order: tIdx + 1
            }
          });
        }

        // Add a Quiz if specified
        if (modData.quiz) {
          const quiz = await prisma.quiz.create({
            data: {
              moduleId: module.id,
              title: modData.title + " Quiz",
              description: "Test your knowledge with " + modData.quiz + " questions based on this module.",
              passingScore: 70,
              status: 'PUBLISHED'
            }
          });
          
          await prisma.quizQuestion.create({
            data: {
              quizId: quiz.id,
              type: 'MULTIPLE_CHOICE',
              question: "Which of the following concepts was covered in " + modData.title + "?",
              options: JSON.stringify(["Concept A", "Concept B", "All topics listed in the syllabus", "None of the above"]),
              correctOptions: JSON.stringify(["All topics listed in the syllabus"]),
              explanation: "Review the module content to understand all the concepts thoroughly.",
              order: 1
            }
          });
        }
      }
    } else if (milestoneData.title.includes("CAPSTONE")) {
      // Create a dummy module for Capstone so we can attach an assignment
      await prisma.module.create({
        data: {
          courseId: course.id,
          title: "Capstone Requirements",
          description: "Final Project details.",
          status: 'PUBLISHED',
          order: 1
        }
      });
    }

    // Add Milestone Project (Assignment) at the end of the Course
    if (milestoneData.project) {
      const lastModule = await prisma.module.findFirst({
        where: { courseId: course.id },
        orderBy: { order: 'desc' }
      });
      
      if (lastModule) {
        await prisma.assignment.create({
          data: {
            moduleId: lastModule.id,
            title: "🏆 Milestone Project: " + milestoneData.project.title,
            instructions: "Apply everything you have learned in this milestone to build: **" + milestoneData.project.title + "**.\n\n### Requirements:\n" + milestoneData.project.requirements + "\n\nSubmit your GitHub repository link and a live URL (if applicable).",
            requirements: milestoneData.project.requirements,
            allowedTypes: ['GITHUB_URL'],
            status: 'PUBLISHED'
          }
        });
      }
    }
  }

  console.log('✅ Cyber Security Expert Roadmap successfully seeded!');
}

seedCyberSecurityMasterclass()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
