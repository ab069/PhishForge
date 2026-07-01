import random

TEMPLATES = [
    {"name": "Password Reset", "template": "Your password will expire in 24 hours. Click here to reset: {link}", "subject": "Action Required: Password Expiry Notice"},
    {"name": "Security Alert", "template": "Suspicious login detected from {ip}. Verify your account: {link}", "subject": "Security Alert: Unusual Sign-In Activity"},
    {"name": "Invoice", "template": "Outstanding invoice #{id} is due. View and pay: {link}", "subject": "Invoice {id} - Payment Required"},
    {"name": "DocuSign", "template": "Please review and sign the attached document: {link}", "subject": "Document Ready for Signature"},
    {"name": "IT Notification", "template": "IT Department: Upgrade your mailbox storage. Start here: {link}", "subject": "IT Notice: Mailbox Upgrade Required"},
    {"name": "LinkedIn Message", "template": "You have a new connection request. View profile: {link}", "subject": "New Connection Request"},
    {"name": "Meeting Invite", "template": "Meeting rescheduled for tomorrow. Confirm attendance: {link}", "subject": "Updated: Meeting Invitation"},
    {"name": "Expense Report", "template": "Your expense report #{id} has been flagged. Review: {link}", "subject": "Expense Report Requires Attention"},
]

def generate_template(template_type: str | None = None) -> dict:
    if template_type:
        for t in TEMPLATES:
            if t["name"].lower() == template_type.lower(): return t
    return random.choice(TEMPLATES)

def simulate_click(campaign_id: str, target_email: str) -> dict:
    return {"campaign_id": campaign_id, "target_email": target_email, "clicked": True, "timestamp": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat()}
