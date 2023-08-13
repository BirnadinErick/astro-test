---
title: "Advanced Python: Comprehension to save code"
datePublished: Fri Mar 03 2023 15:54:11 GMT+0000 (Coordinated Universal Time)
cuid: clfmq3i0b000609i705eh3j20
slug: advanced-python-comprehension-to-save-code
canonical: https://medium.com/@birnadin/advanced-python-comprehensions-c6914520323a
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1679673152013/68769cc0-b37c-4a0a-9147-bbd3a177a37d.png
tags: python, compression, tips, functional-programming, advanced
---

Ever got annoyed when you want a list of items from another sequence but had to write a _for_/_while_ loop? Did you know you could have done it in one line? I am not just taking about list, you can do this trick with any standard sequence like _dictionary_, _set_ and any custom _generators_.

Executable Codesandbox…

# **Comprehension, you say?**

Comprehension in python is just a **syntactic sugar** for a loop and _.append()_ statement.

Let’s say we have database query of blog posts with attribute of _publish_at_, by design this is a way this system supports scheduled blog post and if current datetime is latest than this, then response will contain filtered blog post items.

```javascript
from datetime.datetime import now

blogs_filtered = [
  (blog.title(), blog.category()) # what to save
  for blog in blogs               # what to iterate
  if blog.publish_at <= now()     # any filtering condiitonal
]
```

As you can see, we iterate over query results, `blogs` and if `publish_at < now()` i.e. if `publish_at is latest than now()` we save the query’s `title` & `category`. **If we didn’t use comprehensions, then the snippet would be like,**

```javascript
from datetime.datetime import now

blogs_filtered = []
for blog in blogs:                    # what to iterate
  if blog.publish_at <= now():      # any filtering condiitonal
    blogs_filtered.append(
     (blog.title(), blog.category())  # what to save
    )
```

See? Comprehensions saves you lines, which means less byte-code to process thus comparatively faster execution; less mental power to _comprehend_ what the snippet does and also can be written in one line 😎.

Not just _list_ but *dict*s also. E.g., we have 2 lists one should be key and other should be its corresponding value, given that the position of these items are already in place.

```javascript
keys = [...] # some keys
vals = [...] # some values

assert(len(keys) == len(vals)) # just in case

# dict comprehension
dict_needed = {k:v for k,v in zip(keys,vals)}
```

If not for _comprehensions_, then you would have gone like this:

```javascript
keys = [...] # some keys
vals = [...] # some values

assert(len(keys) == len(vals)) # just in case

# already seen for loop, thus let's use while loop
i = len(keys)
dict_needed = {}
while i:
  dict_needed[keys[i]] = vals[i]
  i -= 1
```

Which one is concise? Let me know in the comments. Let’s examine the syntax.

# **The Syntax**

## **List Comprehension**

```javascript
list_out = [element for element in sequence if condition]
```

Here, `sequence` can be any generator or iterator and `element` is each element in the `sequence`; and it is committed to the output is `condition` evaluates to `True`.

![list comprehension in actions](https://miro.medium.com/v2/resize:fit:451/1*WJ3k1qOj9SAfQ4h1Wl5xIA.png align="left")

src/list-comp.py from the codesandbox.

## **Dictionary Comprehension**

```javascript
dict_out = {k:v for k,v in dict if condition}
```

Same as list comprehension but using _tuple unpacking,_ we can separate the key and value of each record and operate on them; conditional block operates the same though.

![dict comprehension in action](https://miro.medium.com/v2/resize:fit:562/1*6jGDBXtnpYXq5JgWNP2Hrg.png align="left")

src/dict-comp.py from the codesandbox.

## **Set Comprehension**

```javascript
set_out = {i for i in sequence if condition}
```

Looks like combination of list and dictionary, eh? Functionality is the same.

## **So**

Comprehension in a nutshell being: -

- operation on `el`,
- an iterator lexemes, `for el in els`,
- a conditonal, `if condition`, that filters out commition of `el` based on returned boolean _(optional),_
- surrounded by either `[]` or `{}` to indicate what datatype to produce.

# **Complex Patterns**

## **Creating _hashmap of titles and their category_**

Assume, we have list of `Blog`s whose `title` have to be indexed according to corresponding `category`. If `Blog` is defined as…

```javascript
class Blog:
  title: str
  category: str
  # other attributes

  def __init__(self, t, c):
    self.title = t
    self.category = c

  def __repr__(self):
    return self.title.lower()
```

And let’s create a helper function to generate _n_ no. of blogs.

```javascript
def _gen_blogs(n):
    from random import randint
    return [Blog('blog title'+str(i), str(randint(0,100))) for i in range(1,n+1)]
```

You can clearly tell that _list comprehension is used._ This is a fairly good example when a **syntactic sugar** being more of a pain in the finger. When I am faced with such a gibberish I used to format it in 3+ lines based of the abstract lexemes, see code-block-1.

```javascript
def _gen_blogs(n):
  from random import randint
  return [
    Blog(
      'blog title'+str(i), str( randint(0,100) )
    )                       # what to commit
    for i in range(1,n+1)   # what to iterate
                            # no conditional
  ]
```

Right away a bad practice of defining _import_ statement in the local function. Then readability being shot down by _comprehensions_.

If we disect the _return_ statement, we are iterating to arithmetic progression of common difference 1, i.e. `1,2,3,...,n-2,n-1,n`. Each iteration `i` takes each value. Then for each iteration, a `Blog` instance is created with _title_ of `blog title {i}`, e.g. for 3rd iteration title will be `blog title 3`; And each instance will have the _category_ of a pseudo-random integer generated in between 0 and 100 (exclusive).

Then **generation of map** will be…

```javascript
def map_title_to_category():
    blogs = _gen_blogs(4) # generate 4 blogs, play with 4 if you want 😁
    out = {blog.title:blog.category for blog in blogs} # mapping
    map_result(blogs, out)
```

Try to understand the block,

```javascript
out = {blog.title:blog.category for blog in blogs}
```

Hope you can, it ain’t much. If you are stuck, use the comments, I will reply.

## **You can actually chain them.**

```javascript
def alpha_pos():
    m = {a:p for a,p in zip([chr(i) for i in range(97,123)], [p for p in range(1, 27)]) if a not in "a.e.i.o.u".split(".")}
    map_result([[chr(i) for i in range(97,123)], [p for p in range(1, 27)]], m) # just for pretty output
```

![chaining comprehensions](https://miro.medium.com/v2/resize:fit:636/1*YOkf9ur23NTiyytHCMaBwQ.png align="left")

src/chain-comp.py

It is the chain that makes it hard to read, not the logic. Try to interpret on your own, and if you need help, I am just a comment away. _Hint: make each comprehensions a separate variable and analyze_.

## **With a pinch of salt & a punch of lime**

To be efficient, let’s save user configuration in _bitmask_ instead of _Json_ etc.

> _If you think JSON is better way to save data, the watch this_ [**_short video_**](https://www.youtube.com/watch?v=MuCK81q1edU)_._

By design we are saving 4 toggles (but you can go wild) with 4 bits, each being,

```javascript
dark-mode  data-saver-on  auto-play  auto-update
  1|0        1|0            1|0        1|0
```

Altogether there are 16 permutations. If we are doing analysis, where we need to decide whether we keep data-saver algorithm, you are tasked with finding no of users, you can go about doing this as,

```javascript
users = [] # our specimen
num = len([u for u in users if u.conf | 0b0100]) # extremly simplified for brevity
```

In another scenario, say we are changing our database design and decided to not let users have period `.` in the end of the _username_. To save the day and show dominance let’s use a one-liner even though we could have gone with readable script of poly-liner 😎.

```javascript
# Lazy loading the billion users
def get_users():
  i = 0
  while i < 3 * 10**12:
    # this is mapped in the data presentation layer,
    # not that we are indexing off of a list
    yield User[i]
    i += 1
```

```javascript
for user in get_users():
  user.uname = user.uname if user.uname[-1] != '.' else user.uname[:-1]
  user.commit() # or whatever
```

Can be…

```javascript
_ = map(lambda u: u.commit(), [lambda u: u.uname[:-1] if u.uname[-1] == '.' else u.uname for user in (User[i] for i in range(3 * 10**12 + 1))])
```

…like this.

![](https://miro.medium.com/v2/resize:fit:297/1*c4iLtesqc1a1lXK8uOKQkQ.gif align="left")

now show dominance 😎.

# **Epilogue**

That’s all I can think of. If you are intrigued and interested, make sure you follow me on [Medium](https://www.medium.com/@birnadin) or [Twitter](https://twitter.com/birnadin) for follow up.

See you in another one, till then **_it’s me the BE,_** signing off 👋.

Cover background by [**Jan Karan**](https://www.pexels.com/@jan-karan/) & Code to PNG using [**_Ray.so_**](http://Ray.so)
