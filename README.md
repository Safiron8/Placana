# Plácaná

###### Script, který automaticky píše zprávy plácaný do chatu na discordu

Hodnoty k nahrazení v sendMessage:

GUILDID - Id serveru
CHANNELID - Id kanálu, kam se má zpráva posílat
AUTH-TOKEN - Autorizační token, Restart discordu -> CTRL+SHIFT+I -> Konzole -> Application -> Local storage -> hledat "token" (s nikým nesdílet)
TOKEN - Token pro odesílání zpráv, CTRL+SHIFT+I -> Konzole -> Network -> napište třeba smajlíka -> objeví se síťový provoz s názvem "science" -> kliknout -> sjet dolu -> request payload -> "token"

Případně lze zopakovat kroky z TOKENu a místo smajlíka poslat zprávu a na síťový provoz "message" kliknout pravým a dát copy -> copy as fetch a nahradit to v tělíčku funkce sendMessage s úpravou body, aby se tam dávala custom message.

###### Pro funkčnost stačí nahradit hodnoty zmíněné výše a celý obsah souboru nakopírovat do konzole. Lze to vypnout/zapnout pomocí toggleTimer()

Seznam pláců/nepláců:

00:00 Neplác/Plác

00:00 Zrcadový neplác/plác

01:01 Neplác/Plác

01:02 Minuty dvakrát neplác/plác

01:10 Zrcadový neplác/plác

01:23 Postupka neplác/plác

02:01 Hodiny dvakrát neplác/plác

02:02 Neplác/Plác

02:04 Minuty dvakrát neplác/plác

02:20 Zrcadový neplác/plác

03:03 Neplác/Plác

03:06 Minuty dvakrát neplác/plác

03:30 Zrcadový neplác/plác

04:02 Hodiny dvakrát neplác/plác

04:04 Neplác/Plác

04:08 Minuty dvakrát neplác/plác

04:30 Vltava neplác/plác

04:40 Zrcadový neplác/plác

05:00 Říp neplác

05:05 Neplác/Plác

05:10 Minuty dvakrát neplác/plác

05:50 Zrcadový neplác/plác

06:03 Hodiny dvakrát neplác/plác

06:06 Neplác/Plác

06:12 Minuty dvakrát neplác/plác

07:00 Zrcadový neplác/plác

07:07 Neplác/Plác

07:14 Minuty dvakrát neplác/plác

08:04 Hodiny dvakrát neplác/plác

08:08 Neplác/Plác

08:10 Zrcadový neplác/plác

08:16 Minuty dvakrát neplác/plác

09:09 Neplác/Plác

09:18 Minuty dvakrát neplác/plác

09:20 Zrcadový neplác/plác

10:01 Zrcadový neplác/plác

10:05 Hodiny dvakrát neplác/plác

10:10 Neplác/Plác

10:20 Minuty dvakrát neplác/plác

10:30 Zrcadový neplác/plác

11:11 Neplác/Plác

11:11 Zrcadový neplác/plác

11:22 Minuty dvakrát neplác/plác

11:34 Labe neplác/plác

12:06 Hodiny dvakrát neplác/plác

12:12 Neplác/Plác

12:21 Zrcadový neplác/plác

12:24 Minuty dvakrát neplác/plác

12:34 Postupka neplác/plác

13:13 Neplác/Plác

13:23 Lysá hory neplác/plác

13:26 Minuty dvakrát neplác/plác

13:31 Zrcadový neplác/plác

13:48 Založení Karlovy univerzity neplác/plác

13:57 Založení Karlova mostu neplác/plác

14:07 Hodiny dvakrát neplác/plác

14:14 Neplác/Plác

14:24 Kralický Sněžník neplác

14:28 Minuty dvakrát neplác/plác

14:41 Zrcadový neplác/plác

14:15 Upálení mistra Jana Husa neplác/plác

15:15 Neplác/Plác

15:30 Minuty dvakrát neplác/plác

15:31 Praděd neplác/plác (1491)

15:51 Zrcadový neplác/plác

16:03 Sněžka neplác/plác

16:08 Hodiny dvakrát neplác/plác

16:16 Neplác/Plác

16:20 Bílá hora neplác/plác

16:32 Minuty dvakrát neplác/plác

17:01 Zrcadový neplác/plác

17:17 Neplác/Plác

17:34 Minuty dvakrát neplác/plác

18:09 Hodiny dvakrát neplác/plác

18:11 Zrcadový neplác/plác

18:18 Neplác/Plác

18:36 Minuty dvakrát neplác/plác

19:19 Neplác/Plác

19:21 Zrcadový neplác/plác

19:38 Minuty dvakrát neplác/plác

20:02 Zrcadový neplác/plác

20:10 Hodiny dvakrát neplác/plác

20:20 Neplác/Plác

20:31 Zrcadový neplác/plác

20:40 Minuty dvakrát neplác/plác

21:12 Zrcadový neplác/plác

21:19 Převrácený zrcadlový neplác/plác

21:21 Neplác/Plác

21:42 Minuty dvakrát neplác/plác

22:11 Hodiny dvakrát neplác/plác

22:22 Neplác/Plác

22:22 Zrcadový neplác/plác

22:44 Minuty dvakrát neplác/plác

23:23 Neplác/Plác

23:32 Zrcadový neplác/plác

23:45 Postupka neplác/plác

23:46 Minuty dvakrát neplác/plác