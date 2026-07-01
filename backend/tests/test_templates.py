from app.agents.templates import generate_template, TEMPLATES

def test_generate_random(): t = generate_template(); assert "template" in t; assert "subject" in t
def test_generate_specific(): t = generate_template("Invoice"); assert "Invoice" in t["name"]
def test_all_templates_have_fields():
    for t in TEMPLATES: assert all(k in t for k in ["name", "template", "subject"])
def test_template_count(): assert len(TEMPLATES) == 8
